// TODO move to a separate package
import fs from '@platyplus/fs'
import chalk from 'chalk'
import git from 'isomorphic-git'
import http from 'isomorphic-git/http/node'
import path from 'path'
import semver from 'semver'

import { HelmChart } from '../helm/types'
import { getGlobalGitAuthorInfo } from './git'
import { recommendedBump } from './version'

export type HelmVersionOptions = {
  tagName?: string
  gitDir?: string
  additionalPaths?: string[]
  addAll?: boolean
}

// TODO Check to make sure the git working directory is clean before we get started. Your scripts may add files to the commit in future steps. This step is skipped if the --force flag is set.
export const helmVersion = async (
  helmPath: string,
  options?: HelmVersionOptions
): Promise<void> => {
  const dir = await git.findRoot({
    fs,
    filepath: options?.gitDir || process.cwd()
  })
  const chartYamlPath = path.join(dir, helmPath, 'Chart.yaml')
  const chartYaml = await fs.readYaml<HelmChart>(chartYamlPath)
  const tagName = options?.tagName || chartYaml.name
  const recommendation = await recommendedBump(tagName, [
    path.join(dir, helmPath),
    ...(options?.additionalPaths || []).map((p) => path.join(dir, p))
  ])
  if (recommendation.releaseType) {
    // * Determine new version from the current version in Chart.yaml
    const oldVersion = chartYaml.version || '0.0.1'
    const newVersion =
      semver.inc(oldVersion, recommendation.releaseType || 'patch') ||
      ('0.0.1' as string)
    chartYaml.version = newVersion

    // * Save changelog into Helm Chart according to artifacthub standard
    // TODO generate changelog according to conventional-changelog-angular
    if (!chartYaml.annotations) chartYaml.annotations = {}
    const changes = recommendation.commits
      .filter(({ type }) => type === 'fix' || type === 'feat')
      .map((commit) => `- ${commit.header}`)
      .join('\n')
    chartYaml.annotations['artifacthub.io/changes'] = changes
    // TODO configure CHANGELOG.md

    // * Update Chart.yaml
    await fs.saveYaml(chartYamlPath, chartYaml)

    // * Git add
    if (options?.addAll) {
      await git.add({ fs, dir, filepath: helmPath })
      if (options?.additionalPaths) {
        for (const p of options.additionalPaths) {
          await git.add({ fs, dir, filepath: p })
        }
      }
    } else {
      await git.add({ fs, dir, filepath: chartYamlPath })
    }

    const ref = `${tagName}@${newVersion}`
    const message = `${ref}: bump ${recommendation.releaseType} version from ${oldVersion} to ${newVersion}`

    // * Git tag
    await git.tag({ fs, dir, ref })

    // * Git commit
    const author = await getGlobalGitAuthorInfo()
    await git.commit({ fs, dir, message, author })

    // * Git push
    await git.push({ fs, http })

    console.log(chalk.green(message))
  } else {
    console.log(chalk.green(recommendation.reason))
  }
}

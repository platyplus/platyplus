import path from 'path'
import semver from 'semver'

import { DEFAULT_WORKING_DIR } from '../settings'
import { recommendedBump } from '../utils'
import { getProject } from './get'
import { ProjectConfig } from './types'

const recommendedVersionBump = async ({ directory, name }: ProjectConfig) => {
  const packageName = `${directory}/${name}` // TODO add packageName to ProjectConfig
  return await recommendedBump(packageName, [
    path.join(DEFAULT_WORKING_DIR, directory)
  ])
}

export const bumpProjectVersion = async (
  projectName: string
): Promise<void> => {
  const project = await getProject(projectName)
  const recommendation = await recommendedVersionBump(project)
  console.log(recommendation.releaseType)
  const oldVersion = '0.0.1' // TODO get orginal version from helm chart or from git tag?
  const newVersion = semver.inc('0.0.1', recommendation.releaseType || 'patch')
  console.log(oldVersion, newVersion)
  // TODO save new version to helm chart
  // TODO (commit?) and tag => reproduce npm version workflow
}

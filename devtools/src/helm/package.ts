import fs from '@platyplus/fs'
import chalk from 'chalk'
import { execSync } from 'child_process'
import path from 'path'

import { listProjects } from '../project'
import { DEFAULT_WORKING_DIR } from '../settings'

export const packageCharts = async (
  destination: string = DEFAULT_WORKING_DIR,
  url?: string
): Promise<void> => {
  if (!path.isAbsolute(destination))
    destination = path.join(DEFAULT_WORKING_DIR, destination)
  await fs.ensureDir(destination)
  if (fs.pathExists(path.resolve('chart'))) {
    console.log(chalk.green('Packaging global charts...'))
    execSync(
      `helm package charts/* --dependency-update --destination ${destination}`,
      {
        cwd: DEFAULT_WORKING_DIR,
        stdio: 'inherit'
      }
    )
  }
  for (const project of await listProjects()) {
    const projectChart = path.join(
      DEFAULT_WORKING_DIR,
      project.directory,
      'helm'
    )
    if (await fs.pathExists(projectChart)) {
      console.log(
        chalk.green(`Packaging chart of project "${project.name}"...`)
      )
      execSync(
        `helm package ${projectChart} --dependency-update --destination ${destination}`,
        {
          cwd: DEFAULT_WORKING_DIR,
          stdio: 'inherit'
        }
      )
    }
  }
  let buildIndex = 'helm repo index'
  if (url) buildIndex += ` --url ${url}`
  if (url)
    execSync(`${buildIndex} ${destination}`, {
      cwd: DEFAULT_WORKING_DIR,
      stdio: 'inherit'
    })
}

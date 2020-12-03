import { saveYaml } from '@platyplus/fs'
import chalk from 'chalk'
import path from 'path'

import { writeDockerfiles } from '../docker'
import { syncHelmChart } from '../helm'
import { DEFAULT_WORKING_DIR } from '../settings'
import { loadSkaffoldConfiguration } from '../skaffold'
import { getProject } from './get'
import { ProjectConfig } from './types'

export const syncProject = async (
  projectName: string
): Promise<ProjectConfig> => {
  const config = await getProject(projectName)
  await syncHelmChart(config)
  for (const service of config.services) {
    console.log(`Writing dockerfile ${service.name}`)
    await writeDockerfiles(service)
  }

  const skaffold = await loadSkaffoldConfiguration(config)
  await saveYaml(
    path.join(DEFAULT_WORKING_DIR, config.directory, 'skaffold.yaml'),
    skaffold
  )
  console.log(chalk.green('Project synced.'))
  return config
}

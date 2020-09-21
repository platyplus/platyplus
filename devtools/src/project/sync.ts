import path from 'path'

import { saveYaml } from '@platyplus/fs'

import { loadSkaffoldConfiguration } from '../skaffold'
import { DEFAULT_ROOT_DIR } from '../settings'
import { syncHelmChart } from '../helm'
import { writeDockerfiles } from '../docker'

import { getProjectConfiguration } from './get-config'
import { DevToolsConfig } from './types'

export const syncProject = async (
  projectName: string
): Promise<DevToolsConfig> => {
  const config = await getProjectConfiguration(projectName)
  await syncHelmChart(config)
  for (const service of config.services) {
    await writeDockerfiles(service)
  }

  const skaffold = await loadSkaffoldConfiguration(config)
  await saveYaml(
    path.join(DEFAULT_ROOT_DIR, config.directory, 'skaffold.yaml'),
    skaffold
  )
  console.log('Project synced.')
  return config
}

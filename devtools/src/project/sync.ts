import { saveYaml } from '@platyplus/fs'
import path from 'path'

import { writeDockerfiles } from '../docker'
import { syncHelmChart } from '../helm'
import { DEFAULT_ROOT_DIR } from '../settings'
import { loadSkaffoldConfiguration } from '../skaffold'
import { getProject } from './get'
import { DevToolsConfig } from './types'

export const syncProject = async (
  projectName: string
): Promise<DevToolsConfig> => {
  const config = await getProject(projectName)
  await syncHelmChart(config)
  for (const service of config.services) {
    console.log(`write dockerfile ${service.name}`)
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

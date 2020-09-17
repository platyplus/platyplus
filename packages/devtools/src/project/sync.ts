import path from 'path'

import { saveYaml } from '@platyplus/fs'

import { loadConfiguration } from '../configuration'
import { loadSkaffoldConfiguration } from '../skaffold'
import { DEFAULT_ROOT_DIR } from '../config'

export const syncProject = async (projectPath: string): Promise<void> => {
  const config = await loadConfiguration(projectPath)
  const skaffold = await loadSkaffoldConfiguration(projectPath, config)
  await saveYaml(
    path.join(DEFAULT_ROOT_DIR, projectPath, 'skaffold.yaml'),
    skaffold
  )
  console.log('Project synced.')
}

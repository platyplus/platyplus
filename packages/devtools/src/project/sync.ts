import path from 'path'

import { loadConfiguration } from '../configuration'
import { loadSkaffoldConfiguration } from '../skaffold'
import { saveYaml } from '@platyplus/fs'

export const syncProject = async (projectPath: string): Promise<void> => {
  const config = await loadConfiguration(projectPath)
  const skaffold = await loadSkaffoldConfiguration(projectPath, config)
  await saveYaml(path.join(projectPath, 'skaffold.yaml'), skaffold)
  console.log('Project synced.')
}

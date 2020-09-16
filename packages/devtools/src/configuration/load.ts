import path from 'path'

import { loadYaml, saveYaml } from '../utils'

import { DevToolsConfig } from './types'
import { defaultPdtConfig } from './default'

/**
 * Load a custom Platyplus DevTools config.yaml file, and set the default values
 * @param projectPath
 * @param create creates the configuration if is doesn't exist
 */
export const loadConfiguration = async (
  projectPath: string,
  create = true
): Promise<DevToolsConfig> => {
  console.log(`Syncing ${projectPath}/config.yaml...`)
  const config = await loadYaml(
    projectPath,
    'config.yaml',
    defaultPdtConfig(projectPath),
    create
  )
  if (!config.name) {
    config.name = projectPath
    await saveYaml(path.join(projectPath, 'config.yaml'), config)
  }
  return config
}

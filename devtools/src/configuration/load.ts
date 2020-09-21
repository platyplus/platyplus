import path from 'path'

import { loadYaml, saveYaml } from '@platyplus/fs'
import { getLernaPackage } from '@platyplus/lerna'

import { DEFAULT_ROOT_DIR } from '../settings'
import { loadPackageInformation } from '../package'

import { DevToolsConfig, DevToolsConfigFile } from './types'
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
  const filePath = path.join(DEFAULT_ROOT_DIR, projectPath, 'config.yaml')
  const config = await loadYaml<DevToolsConfigFile>(
    filePath,
    defaultPdtConfig(projectPath),
    create
  )
  if (!config.name) {
    config.name = projectPath
    await saveYaml(path.join(projectPath, 'config.yaml'), config)
  }
  const services = await Promise.all(
    config.services.map(async (service) => {
      const npmPackage = await getLernaPackage(service.package)
      return await loadPackageInformation(npmPackage.location)
    })
  )
  return { ...config, services }
}

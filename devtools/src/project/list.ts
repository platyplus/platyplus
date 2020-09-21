import path from 'path'
import yaml from 'yaml'

import fs from '@platyplus/fs'

import { PackageJson } from '../package'
import { DEFAULT_ROOT_DIR } from '../settings'
import { DevToolsConfigFile } from '../configuration'

export const listProjects = async (): Promise<
  Record<string, DevToolsConfigFile>
> => {
  const mainPackageJson: PackageJson = await fs.readJson(
    path.join(DEFAULT_ROOT_DIR, 'package.json')
  )
  const globs = mainPackageJson.workspaces?.packages || []
  const result: Record<string, DevToolsConfigFile> = {}
  for (const glob of globs) {
    const list = fs.glob.sync(path.join(DEFAULT_ROOT_DIR, glob))
    const configFile = list.find((file) => file.endsWith('/config.yaml'))
    if (configFile) {
      const config = await fs.readYaml<DevToolsConfigFile>(configFile)
      const relativePath = configFile
        .replace(`${DEFAULT_ROOT_DIR}/`, '')
        .replace('/config.yaml', '')
      result[relativePath] = config
    }
  }
  return result
}

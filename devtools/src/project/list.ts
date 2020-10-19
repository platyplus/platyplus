import fs from '@platyplus/fs'
import path from 'path'

import { PackageJson } from '../package'
import { DEFAULT_WORKING_DIR } from '../settings'
import { DevToolsConfigFile } from './types'

export const listProjects = async (): Promise<DevToolsConfigFile[]> => {
  const mainPackageJson: PackageJson = await fs.readJson(
    path.join(DEFAULT_WORKING_DIR, 'package.json')
  )
  const globs = mainPackageJson.workspaces?.packages || []
  const result: DevToolsConfigFile[] = []
  for (const glob of globs) {
    const list = fs.glob.sync(path.join(DEFAULT_WORKING_DIR, glob))
    const configFile = list.find((file) => file.endsWith('/.platy.yaml'))
    if (configFile) {
      const config = await fs.readYaml<DevToolsConfigFile>(configFile)
      const directory = configFile
        .replace(`${DEFAULT_WORKING_DIR}/`, '')
        .replace('/.platy.yaml', '')
      result.push({ ...config, directory })
    }
  }
  return result
}

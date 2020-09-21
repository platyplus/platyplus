import path from 'path'
import objectPath from 'object-path'

import { loadYaml, readJson, writeJson } from '@platyplus/fs'

import { DEFAULT_ROOT_DIR } from '../settings'

import { DevToolsConfig } from './types'
import { getProjectConfiguration } from './get-config'
import { defaultPdtConfig } from './default'
import { PackageJson } from '../package'
import { ensureWorkspace } from '../utils'

export const createProject = async (
  name: string,
  directory: string,
  description = ''
): Promise<DevToolsConfig> => {
  try {
    await getProjectConfiguration(name)
    throw Error(`exists`)
  } catch (e) {
    if (e.message !== 'exists') {
      const yamlPath = path.join(DEFAULT_ROOT_DIR, directory, 'config.yaml')
      await ensureWorkspace(`${directory}/*`)
      return await loadYaml(yamlPath, defaultPdtConfig(name, description))
    } else throw Error('Project already exists')
  }
}

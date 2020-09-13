import { readFile } from 'fs/promises'
import yaml from 'yaml'
import merge from 'merge-deep'

import { Config } from './types'
import { DEFAULT_CONFIG } from './default'

/**
 * Load a custom Platyplus DevTools config.yaml file, and set the default values
 * @param filePath
 */
export const loadConfig = async (filePath: string): Promise<Config> => {
  try {
    const textFile = await readFile(filePath)
    try {
      const config = yaml.parse(textFile.toString())
      if (!config.services) config.services = []
      if (!config.skaffold) config.skaffold = {}
      return merge(DEFAULT_CONFIG, config) as Config
    } catch {
      throw Error('config.yaml: invalid yaml file')
    }
  } catch {
    throw Error(`${filePath} does not exist`)
  }
}

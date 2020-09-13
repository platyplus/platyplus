import { readFile } from 'fs/promises'
import yaml from 'yaml'
import { Config } from './types'
import merge from 'merge-deep'
import { DEFAULT_CONFIG } from './default'

export const loadConfig = async (filePath: string): Promise<Config> => {
  try {
    const textFile = await readFile(filePath)
    try {
      const config = yaml.parse(textFile.toString())
      return merge(DEFAULT_CONFIG, config) as Config
    } catch {
      throw Error('config.yaml: invalid yaml file')
    }
  } catch {
    throw Error(`${filePath} does not exist`)
  }
}

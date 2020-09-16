import path from 'path'
import fs from 'fs-extra'
import yaml from 'yaml'
import { DEFAULT_ROOT_DIR } from '../config'
import merge from 'merge-deep'

export const loadYaml = async <T>(
  directory: string,
  name: string,
  defaults: T,
  create = true
): Promise<T> => {
  const filePath = path.join(DEFAULT_ROOT_DIR, directory, name)
  try {
    const textFile = await fs.readFile(filePath)
    try {
      const yamlObject = merge(defaults, yaml.parse(textFile.toString()))
      await fs.outputFile(filePath, yaml.stringify(yamlObject))
      return yamlObject
    } catch {
      throw Error(`${directory}/${name}: invalid yaml file`)
    }
  } catch {
    if (create) {
      const yamlObject = { ...defaults }
      await fs.outputFile(filePath, yaml.stringify(yamlObject))
      return yamlObject
    } else throw Error(`${filePath} does not exist`)
  }
}

export const saveYaml = async <T>(
  filePath: string,
  yamlObject: T
): Promise<void> => {
  await fs.outputFile(
    path.join(DEFAULT_ROOT_DIR, filePath),
    yaml.stringify(yamlObject)
  )
}

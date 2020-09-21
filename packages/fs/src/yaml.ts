import fs from 'fs-extra'
import merge from 'merge-deep'
import yaml from 'yaml'

export const loadYaml = async <T>(
  filePath: string,
  defaults: T,
  create = true
): Promise<T> => {
  try {
    const textFile = await fs.readFile(filePath)
    try {
      const yamlObject = merge(defaults, yaml.parse(textFile.toString()))
      await fs.outputFile(filePath, yaml.stringify(yamlObject))
      return yamlObject
    } catch {
      throw Error(`${filePath}: invalid yaml file`)
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
  await fs.outputFile(filePath, yaml.stringify(yamlObject))
}

export const readYaml = async <T>(filePath: string): Promise<T> => {
  const file = await fs.readFile(filePath)
  return yaml.parse(file.toString())
}

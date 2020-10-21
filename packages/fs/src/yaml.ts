import merge from 'deepmerge'
import fs from 'fs-extra'
import yaml from 'yaml'

export const loadYaml = async <T>(
  filePath: string,
  defaults: T,
  create = true,
  options?: merge.Options
): Promise<T> => {
  try {
    const textFile = await fs.readFile(filePath)
    try {
      const yamlObject = merge<T>(
        defaults,
        yaml.parse(textFile.toString()),
        options
      )
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

export const readYaml = async <
  T extends Record<string, unknown> | Record<string, unknown>[]
>(
  filePath: string
): Promise<T> => {
  const file = await fs.readFile(filePath)
  return yaml.parse(file.toString())
}

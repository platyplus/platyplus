import path from 'path'
import handlebars from 'handlebars'

import fs from '@platyplus/fs'

import { Package } from '../package/types'
import { DEFAULT_ROOT_DIR } from '../config'

export const templateToString = async <T extends Package>(
  path: string,
  variables: T
): Promise<string> => {
  if (!(await fs.pathExists(path))) throw Error(`${path} not found`)
  const template = (await fs.readFile(path)).toString()
  return handlebars.compile(template)(variables)
}

export const templateToFile = async <T extends Package>(
  source: string,
  destination: string,
  variables: T
): Promise<void> => {
  const result = await templateToString(source, variables)
  await fs.outputFile(destination, result)
}

export const generateTemplateFiles = async <T extends Package>(
  type: string,
  destination: string,
  variables: T
): Promise<void> => {
  const destinationDir = `${DEFAULT_ROOT_DIR}/${destination}`
  if (await fs.pathExists(destinationDir))
    throw Error(`The directory "${destinationDir}" already exists.`)
  const source = path.join(__dirname, type)
  if (!(await fs.pathExists(source)))
    throw Error(`No '${type}' template found.`)
  for await (const file of fs.glob.sync(path.join(source, '**', '*'), {
    nodir: true,
  })) {
    const destFile = file.replace(`${source}/`, '')
    // TODO ignore some files, e.g. Helm charts directory
    await templateToFile(file, path.join(destinationDir, destFile), variables)
  }
}

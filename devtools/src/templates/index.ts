import fs from '@platyplus/fs'
import handlebars from 'handlebars'
import path from 'path'

import { PackageInformation } from '../package/types'

export const templateToString = async <T>(
  path: string,
  variables: T
): Promise<string> => {
  if (!(await fs.pathExists(path))) throw Error(`${path} not found`)
  const template = (await fs.readFile(path)).toString()
  return handlebars.compile(template)(variables)
}

export const templateToFile = async <T>(
  source: string,
  destination: string,
  variables: T
): Promise<void> => {
  const result = await templateToString(source, variables)
  await fs.outputFile(destination, result)
}

export const generateTemplateFiles = async <T extends PackageInformation>(
  variables: T
): Promise<void> => {
  if (!variables.type) return
  if (await fs.pathExists(variables.location))
    throw Error(`The directory "${variables.location}" already exists.`)
  const source = path.join(__dirname, variables.type)
  if (!(await fs.pathExists(source)))
    throw Error(`No '${variables.type}' template found.`)
  for await (const file of fs.glob.sync(
    // TODO ignore some other files, e.g. Helm charts directory
    path.join(source, '**', '!(Dockerfile*|.dockerignore)'),
    {
      nodir: true,
    }
  )) {
    const destFile = file.replace(`${source}/`, '')
    await templateToFile(
      file,
      path.join(variables.location, destFile),
      variables
    )
  }
}

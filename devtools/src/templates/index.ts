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

export const generateTemplateFiles = async (
  source: string,
  destination: string,
  variables: Record<string, unknown>,
  exclude: string | string[] = []
): Promise<void> => {
  source = path.join(__dirname, source)
  if (!(await fs.pathExists(source)))
    throw Error(`No '${source}' template found.`)
  if (typeof exclude === 'string') exclude = [exclude]
  exclude = `!(${exclude.join('|')})`
  for await (const file of fs.glob.sync(
    // TODO ignore some other files, e.g. Helm charts directory
    path.join(source, '**', exclude),
    {
      nodir: true,
      dot: true
    }
  )) {
    const destFile = file.replace(`${source}/`, '')
    await templateToFile(file, path.join(destination, destFile), variables)
  }
}

export const generatePackageTemplateFiles = async <
  T extends PackageInformation
>(
  variables: T
): Promise<void> => {
  if (!variables.type) return
  await generateTemplateFiles(variables.type, variables.absolutePath, variables)
}

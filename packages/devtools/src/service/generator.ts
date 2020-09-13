import { readFile, writeFile } from 'fs/promises'
import handlebars from 'handlebars'
import path from 'path'

import { Service } from './types'

/**
 * Generates the Dockerfile of the given service and return it as a string
 * @param service
 * @param environment
 */
const generateDockerfile = async (
  service: Service,
  environment?: 'development'
): Promise<string> => {
  const suffix = environment ? `-${environment}` : ''
  const templatePath = path.join(
    __dirname,
    `./templates/${service.type}/Dockerfile${suffix}`
  )
  const template = (await readFile(templatePath)).toString()
  return handlebars.compile(template)(service)
}

/**
 * Write the Dockerfiles (production and development) of the service in its directory
 * @param service
 */
export const writeDockerfiles = async (service: Service): Promise<void> => {
  const devFile = await generateDockerfile(service, 'development')
  await writeFile(
    path.join(service.location, 'Dockerfile-development'),
    devFile
  )
  const prodFile = await generateDockerfile(service)
  await writeFile(path.join(service.location, 'Dockerfile'), prodFile)
}

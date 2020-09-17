import fs from '@platyplus/fs'
import path from 'path'

import { getInstallFiles } from '../package'
import { templateToString } from '../templates'

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
    `../templates/${service.type}/Dockerfile${suffix}`
  )
  const packages = [getInstallFiles(service)]

  for (const dependency of service.dependencies) {
    packages.push(getInstallFiles(dependency))
  }
  return await templateToString(templatePath, {
    ...service,
    packages
  })
}

/**
 * Write the Dockerfiles (production and development) of the service in its directory
 * @param service
 */
export const writeDockerfiles = async (service: Service): Promise<void> => {
  const devFile = await generateDockerfile(service, 'development')
  await fs.outputFile(
    path.join(service.location, 'Dockerfile-development'),
    devFile
  )
  const prodFile = await generateDockerfile(service)
  await fs.outputFile(path.join(service.location, 'Dockerfile'), prodFile)
}

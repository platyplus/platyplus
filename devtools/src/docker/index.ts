import fs from '@platyplus/fs'
import path from 'path'

import { templateToString } from '../templates'

import { Service } from '../service/types'

/**
 * Write the Dockerfiles (production and development) of the service in its directory
 * @param service
 */
export const writeDockerfiles = async (service: Service): Promise<void> => {
  const devPath = path.join(
    __dirname,
    `../templates/${service.type}/Dockerfile-development`
  )

  if (await fs.pathExists(devPath)) {
    const devFile = await templateToString(devPath, service)
    await fs.outputFile(
      path.join(service.location, 'Dockerfile-development'),
      devFile
    )
  }
  const prodPath = path.join(
    __dirname,
    `../templates/${service.type}/Dockerfile`
  )
  const prodFile = await templateToString(prodPath, service)
  await fs.outputFile(path.join(service.location, 'Dockerfile'), prodFile)
}

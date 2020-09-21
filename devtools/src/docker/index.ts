import fs from '@platyplus/fs'
import path from 'path'
import { PackageInformation } from '../package'

import { templateToString } from '../templates'

const writeDockerFile = async (
  service: PackageInformation,
  dockerFile: string
): Promise<void> => {
  const filePath = path.join(
    __dirname,
    `../templates/${service.type}/${dockerFile}`
  )
  if (await fs.pathExists(filePath)) {
    const file = await templateToString(filePath, service)
    await fs.outputFile(path.join(service.location, dockerFile), file)
  }
}

/**
 * Write the Dockerfiles (production and development) of the service in its directory
 * @param service
 */
export const writeDockerfiles = async (
  service: PackageInformation
): Promise<void> => {
  await writeDockerFile(service, 'Dockerfile')
  await writeDockerFile(service, 'Dockerfile-development')
}

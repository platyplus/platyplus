import fs from '@platyplus/fs'
import path from 'path'

import { templateToString } from '../templates'
import { Package } from '../service'

const writeDockerFile = async (
  service: Package,
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
export const writeDockerfiles = async (service: Package): Promise<void> => {
  await writeDockerFile(service, 'Dockerfile')
  await writeDockerFile(service, 'Dockerfile-development')
}

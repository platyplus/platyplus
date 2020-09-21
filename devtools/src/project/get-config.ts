import { getLernaPackage } from '@platyplus/lerna'

import { loadPackageInformation } from '../package'

import { listProjects } from './list'
import { DevToolsConfig } from './types'

export const getProjectConfiguration = async (
  name: string
): Promise<DevToolsConfig> => {
  const list = await listProjects()
  const result = list.find((project) => project.name === name)
  if (!result) throw Error(`No '${name}' project found in the monorepo.`)

  result.services = await Promise.all(
    result.services.map(async (service) => {
      const npmPackage = await getLernaPackage(service.package)
      return await loadPackageInformation(npmPackage.location)
    })
  )

  return result
}

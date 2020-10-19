import { getLernaPackage } from '@platyplus/lerna'

import { loadPackageInformation } from '../package'
import { serviceTypesConfig } from '../settings'
import { listProjects } from './list'
import { ProjectConfig } from './types'

export const getProject = async (name: string): Promise<ProjectConfig> => {
  const list = await listProjects()
  const result = list.find((project) => project.name === name)
  if (!result) throw Error(`No '${name}' project found in the monorepo.`)

  result.services = await Promise.all(
    result.services.map(async (service) => {
      const npmPackage = await getLernaPackage(service.package)
      const packageInfo = await loadPackageInformation(npmPackage.location)
      const config =
        packageInfo.type && serviceTypesConfig[packageInfo.type](packageInfo)
      return { ...packageInfo, config }
    })
  )

  return result
}

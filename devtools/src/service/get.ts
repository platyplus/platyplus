import { getLernaPackage } from '@platyplus/lerna'

import { loadPackageInformation } from '../package'
import { serviceTypesConfig } from '../settings'
import { ServiceConfig } from './types'

export const getService = async (
  packageName: string
): Promise<ServiceConfig> => {
  const npmPackage = await getLernaPackage(packageName)
  const packageInfo = await loadPackageInformation(npmPackage.location)
  const config =
    packageInfo.type && serviceTypesConfig[packageInfo.type](packageInfo)
  return { ...packageInfo, config }
}

import { PackageInformation } from '../package/types'
import { PackageTypeConfigResult } from '../settings'

export type ServiceConfig = PackageInformation & {
  config?: PackageTypeConfigResult
}

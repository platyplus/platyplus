import { PackageInformation } from '../package'
import { PackageTypeConfigResult } from '../settings'

export type ServiceConfig = PackageInformation & {
  config?: PackageTypeConfigResult
}

export type DevToolsConfigFile = {
  directory: string
  name: string
  description: string
  services: PackageInformation[]
}

export type DevToolsConfig = {
  directory: string
  name: string
  description: string
  services: ServiceConfig[]
}

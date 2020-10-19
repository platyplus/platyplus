import { PackageInformation } from '../package'
import { PackageTypeConfigResult } from '../settings'

export type ServiceConfig = PackageInformation & {
  config?: PackageTypeConfigResult
}

export type ProjectConfigFile = {
  directory: string
  name: string
  description: string
  services: PackageInformation[]
}

export type ProjectConfig = {
  directory: string
  name: string
  description: string
  services: ServiceConfig[]
}

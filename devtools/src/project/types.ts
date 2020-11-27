import { PackageInformation } from '../package'
import { ServiceConfig } from '../service'

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

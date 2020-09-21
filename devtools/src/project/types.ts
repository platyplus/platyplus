import { PackageInformation } from '../package'

export type DevToolsConfigFile = {
  directory: string
  name: string
  description: string
  services: PackageInformation[]
}

export type DevToolsConfig = DevToolsConfigFile & {
  services: PackageInformation[]
}

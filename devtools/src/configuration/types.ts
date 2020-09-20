import { Package } from '../service'

type DevToolsService = {
  package: string
}

export type DevToolsConfigFile = {
  name: string
  description: string
  services: DevToolsService[]
}

export type DevToolsConfig = DevToolsConfigFile & {
  name: string
  description: string
  services: Package[]
}

import { Package } from '../package/types'

export enum ServiceType {
  TsNode = 'ts-node',
}

export type Service = Package & {
  type: ServiceType
  dependencies: Package[]
}

export type PackageJson = {
  name: string
  private?: boolean
  version: string
  description?: string
  author?: string
  homepage?: string
  license: string
  main?: string
  bin?: Record<string, string>
  scripts?: Record<string, string>
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

export type PlatyplusPackageJson = PackageJson & {
  platyplus: {
    type: ServiceType
  }
}

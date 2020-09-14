import { Package, PackageJson } from '../package/types'

export enum ServiceType {
  TsNode = 'ts-node',
}

export type Service = Package & {
  type: ServiceType
  dependencies: Package[]
}

export type PlatyplusPackageJson = PackageJson & {
  platyplus: {
    type: ServiceType
  }
}

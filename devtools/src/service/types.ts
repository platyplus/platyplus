import { PackageInformation, PackageJson } from '../package'
import { PackageType } from '../settings'

export type Package = PackageInformation & {
  dependencies: PackageInformation[]
}

export type ArtifactConfig = Record<
  PackageType,
  (service: Package) => Record<string, unknown>
>

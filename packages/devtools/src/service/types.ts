export type ServiceTypes = 'ts-node'

export type Package = {
  project: string
  name: string
  path: string
  package: string
  location: string
}

export type Service = Package & {
  type: ServiceTypes
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
    type: ServiceTypes
  }
}

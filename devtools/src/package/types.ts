import { PackageType } from '../settings'

export type PackageInformation = {
  type: PackageType
  package: string
  directory: string
  name: string
  location: string
  description?: string
  user?: {
    name: string
    email: string
  }
  repository?: string
}

export type PackageJson = {
  platyplus?: {
    type: PackageType
  }
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
  repository?: {
    type?: string
    url?: string
    directory?: string
  }
  types?: string
  files?: string[]
  publishConfig?: { access: string }
}

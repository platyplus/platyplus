export type Package = {
  package: string
  project: string
  name: string
  path: string
  location: string
  description?: string
  user?: {
    name: string
    email: string
  }
  repository?: string
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

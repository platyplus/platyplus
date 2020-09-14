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

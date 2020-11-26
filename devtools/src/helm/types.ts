export type HelmDependency = {
  name: string
  alias?: string
  condition?: string
  repository?: string
  version: string
}

export type HelmChart = {
  apiVersion: 'v2'
  appVersion: string
  description: string
  name: string
  version: string
  dependencies: HelmDependency[]
}

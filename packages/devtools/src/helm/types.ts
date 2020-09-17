export type HelmDependency = {
  name: string
  alias?: string
  condition?: string
  repository?: string
  // version
}

export type HelmChart = {
  apiVersion: 'v2'
  appVersion: '1.0'
  description: string
  name: string
  version: '0.1.0' //TODO
  dependencies: HelmDependency[]
}

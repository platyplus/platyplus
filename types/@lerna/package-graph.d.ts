import { LernaPackage } from '@lerna/package'
declare module '@lerna/package-graph' {
  export type PackageGraphNode = {
    name: string
    externalDependencies: Map<string, PackageGraphNode>
    localDependencies: Map<string, PackageGraphNode>
    localDependents: Map<string, PackageGraphNode>
  }

  export type GraphType = 'dependencies' | 'allDependencies'
  export default class extends Map<string, PackageGraphNode> {
    constructor(
      packages: LernaPackage[],
      graphType?: GraphType,
      forceLocal?: boolean
    )
  }
}

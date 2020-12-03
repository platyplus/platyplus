declare module '@lerna/package-graph'

type PackageGraphNode = {
  name: string
  externalDependencies: Map<string, PackageGraphNode>
  localDependencies: Map<string, PackageGraphNode>
  localDependents: Map<string, PackageGraphNode>
}

type GraphType = 'dependencies' | 'allDependencies'
class PackageGraph extends Map<string, PackageGraphNode> {
  constructor(
    packages: LernaPackage[],
    graphType: GraphType = 'allDependencies',
    forceLocal: boolean = false
  )
}

export default PackageGraph

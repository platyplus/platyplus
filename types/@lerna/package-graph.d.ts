declare module '@lerna/package-graph'
type PackageGraphNode = {
  name: string
  externalDependencies: Map<unknown>
  localDependencies: Map<unknown>
  localDependents: Map<unknown>
}
export default class implements Map<PackageGraphNode> {
  constructor(packages: LernaPackage[])
}

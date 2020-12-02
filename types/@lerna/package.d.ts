import { LernaPackage } from '@lerna/project'

declare module '@lerna/package-graph'
type PackageGraphNode = {
  name: string
  externalDependencies: Map<unknown>
  localDependencies: Map<unknown>
  localDependents: Map<unknown>
}
export default class implements Map<unknown> {
  constructor(pkg: LernaPackage, location: string, rootPath?: string)
}

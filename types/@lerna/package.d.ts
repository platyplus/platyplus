import { LernaPackage } from '@lerna/project'

declare module '@lerna/package-graph'
export type LernaPackage = {
  name: string
  location: string
  version: string
  private: boolean
  resolved: boolean
  rootPath: string
  version(): string
  version(value: string): void
}

export default class extends Map<string, LernaPackage> {
  constructor(pkg: LernaPackage, location: string, rootPath?: string)
}

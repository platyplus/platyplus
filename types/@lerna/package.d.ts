declare module '@lerna/package' {
  export type LernaPackage = {
    name: string
    location: string
    version: string
    private: boolean
    resolved: boolean
    rootPath: string
  }

  export default class extends Map<string, LernaPackage> {
    constructor(pkg: LernaPackage, location: string, rootPath?: string)
  }
}

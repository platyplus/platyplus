declare module '@lerna/project' {
  import { LernaPackage } from '@lerna/package'
  export type LernaConfig = Record<string, unknown> & {
    npmClient?: 'yarn' | 'npm'
    useWorkspaces?: boolean
    version?: 'independent'
    command?: {
      version?: {
        message?: string
        allowBranch?: string
        conventionalCommits?: boolean
      }
    }
  }

  export function getPackages(cwd: string): Promise<LernaPackage[]>
  export default class {
    constructor(cwd: string)
    getPackages(): Promise<LernaPackage[]>
    config: LernaConfig
  }
}

declare module '@lerna/project'
import { LernaPackage } from './package'

type LernaConfig = Record<string, unknown> & {
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
class Project {
  constructor(cwd: string)
  getPackages(): Promise<LernaPackage[]>
  config: LernaConfig
}

export function getPackages(cwd: string): Promise<LernaPackage[]>
export default Project

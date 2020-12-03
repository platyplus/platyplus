declare module '@lerna/project'
import { LernaPackage } from './package'
class Project {
  constructor(cwd: string)
  getPackages(): Promise<LernaPackage[]>
}

export function getPackages(cwd: string): Promise<LernaPackage[]>
export default Project

declare module '@lerna/project'
type LernaPackage = {
  name: string
  location: string
  version: string
  private: boolean
}

export async function getPackages(cwd: string): Promise<LernaPackage[]>

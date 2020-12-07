import { LernaPackage } from '@lerna/package'
import PackageGraph from '@lerna/package-graph'
import { getPackages } from '@lerna/project'

/**
 * * Gets package information based on its name as per defined in package.json
 * @param name package name as per defined in package.json
 * @param rootDir root dir of the monorepo
 * @return basic package information
 */
export const getLernaPackage = async (
  name: string,
  cwd = process.cwd()
): Promise<LernaPackage> => {
  const result = await (await getPackages(cwd)).find(
    cursor => cursor.name === name
  )
  if (!result) throw Error(`lernaPackage(${name}): not found.`)
  return result
}

/**
 * * Returns the dependent packages of the package given as a parameter
 * @param name package name as per defined in package.json
 */
export const getLernaDependencies = async (
  name: string,
  cwd = process.cwd()
): Promise<LernaPackage[]> => {
  try {
    const pkgs = await getPackages(cwd)
    const graph = new PackageGraph(pkgs)
    const deps = graph.get(name)?.localDependencies
    if (!deps) throw Error(`${name}: No dependencies.`)
    return pkgs.filter(p => deps.get(p.name))
  } catch (error) {
    console.log(error)
    throw Error(`Cannot find package ${name}.`)
  }
}

/**
 * * Checks if a given package is present in the current lerna project
 * @param name package name as per defined in package.json
 */
export const hasLernaPackage = async (name: string): Promise<boolean> => {
  try {
    await getLernaPackage(name)
    return true
  } catch (error) {
    return false
  }
}

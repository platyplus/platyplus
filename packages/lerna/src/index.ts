import { execSync } from 'child_process'

export type LernaPackage = {
  name: string
  location: string
  version: string
  private: boolean
}

/**
 * * Gets package information based on its name as per defined in package.json
 * @param scope package name as per defined in package.json
 * @param rootDir root dir of the monorepo
 * @return basic package information
 */
export const getLernaPackage = async (name: string): Promise<LernaPackage> => {
  const list = await getLernaPackages(name)
  if (list.length !== 1)
    throw Error(
      `lernaPackage(${name}): found ${list.length} package(s) where only one should be found.`
    )
  return list[0]
}

export const getLernaPackages = async (
  scope?: string
): Promise<LernaPackage[]> => {
  try {
    scope = scope ? `--scope='${scope}'` : ''
    const stdout = execSync(
      `lerna ls --loglevel=silent --all --exclude-dependents --json ${scope}`
    ).toString()
    return JSON.parse(stdout)
  } catch (error) {
    console.log(error)
    throw Error(`Cannot find package ${scope}`)
  }
}
/**
 * * Returns the dependent packages of the package given as a parameter
 * ! Only the 'non-private' packages are returned
 * @param scope package name as per defined in package.json
 */
export const getLernaDependencies = async (
  scope?: string
): Promise<LernaPackage[]> => {
  scope = scope ? `--scope='${scope}'` : ''
  try {
    const stdout = execSync(
      `lerna ls --loglevel=silent --include-dependencies --json ${scope}`
    ).toString()
    const list = JSON.parse(stdout) as LernaPackage[]
    return list.filter((p) => p.name !== scope)
  } catch (error) {
    console.log(error)
    throw Error(`Cannot find package ${scope}.`)
  }
}

/**
 * * Checks if a given package is present in the current lerna project
 * @param name package name as per defined in package.json
 */
export const hasLernaPackage = async (scope?: string): Promise<boolean> => {
  try {
    scope = scope ? `--scope='${scope}'` : ''
    const stdout = execSync(
      `lerna ls --loglevel=silent --all --json ${scope}`
    ).toString()
    const list = JSON.parse(stdout) as LernaPackage[]
    return list.length === 1
  } catch (error) {
    return false
  }
}

import { exec } from './process'

/**
 * @param packageName package name as per defined in package.json
 * @param rootDir root dir of the monorepo
 * @return the path of the package relative to the monorepo root dir, without './'
 */
export const lernaPackagePath = async (
  packageName: string,
  rootDir = process.env.INIT_CWD || (process.env.PWD as string)
): Promise<string> => {
  try {
    const stdout = await exec(
      `lerna ls --all --long --exclude-dependents --parseable --scope=${packageName}`
    )
    const [path] = stdout.split(':')
    return path.replace(`${rootDir}/`, '')
  } catch (error) {
    console.log(error)
    throw Error(`Can't find package ${packageName}`)
  }
}

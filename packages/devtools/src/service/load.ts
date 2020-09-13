import fs from 'fs/promises'
import { lernaDependencies, LernaPackage, lernaPackage } from '../utils/lerna'
import { join } from 'path'
import { Package, PlatyplusPackageJson, Service, ServiceTypes } from './types'
import objectPath from 'object-path'
const DEFAULT_ROOT_DIR = process.env.INIT_CWD || (process.env.PWD as string)

const fromLerna = (
  lernaPackage: LernaPackage,
  rootDir = DEFAULT_ROOT_DIR
): Package => {
  const path = lernaPackage.location.replace(`${rootDir}/`, '')
  const [project, name] = path.split('/')
  return {
    project,
    name,
    path,
    package: lernaPackage.name,
    location: lernaPackage.location,
  }
}

export const loadService = async (
  packageName: string,
  rootDir = DEFAULT_ROOT_DIR
): Promise<Service> => {
  const packageInfo = await lernaPackage(packageName)
  const packageJson = JSON.parse(
    (await fs.readFile(join(packageInfo.location, 'package.json'))).toString()
  ) as PlatyplusPackageJson
  const type = objectPath.get(packageJson, 'platyplus.type') as ServiceTypes
  if (!type)
    throw Error(
      `'platyplus.type' field not found in ${packageName}'s package.json`
    )
  const dependencies = await lernaDependencies(packageName)
  const result = fromLerna(packageInfo, rootDir) as Service
  result.type = type
  result.dependencies = dependencies.map((lernaDep) => fromLerna(lernaDep))
  return result
}

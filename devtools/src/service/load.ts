import { join } from 'path'
import objectPath from 'object-path'

import { getLernaDependencies } from '@platyplus/lerna'
import fs from '@platyplus/fs'

import { DEFAULT_ROOT_DIR } from '../config'

import { PlatyplusPackageJson, Service, ServiceType } from './types'
import { fromLernaPackage, fromNpmPackage } from '../package'

/**
 * Loads all the information about a platyplus-managed package
 * @param packageName lerna-managed package name as per defined in a package.json
 * @param rootDir
 */
export const loadService = async (
  jsonPackageDir: string,
  rootDir = DEFAULT_ROOT_DIR
): Promise<Service> => {
  const packageJson = (await fs.readJson(
    join(jsonPackageDir, 'package.json')
  )) as PlatyplusPackageJson
  const type = objectPath.get(packageJson, 'platyplus.type') as ServiceType
  if (!type)
    throw Error(`'platyplus.type' field not found in ${jsonPackageDir}.`)

  const dependencies = await getLernaDependencies(packageJson.name)
  const result = fromNpmPackage(packageJson, jsonPackageDir, rootDir) as Service
  result.type = type
  result.dependencies = dependencies.map(lernaDep => fromLernaPackage(lernaDep))
  return result
}

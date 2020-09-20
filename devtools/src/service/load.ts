import { join } from 'path'

import { getLernaDependencies } from '@platyplus/lerna'
import fs from '@platyplus/fs'

import { DEFAULT_ROOT_DIR } from '../settings'

import { Package } from './types'
import { fromLernaPackage, fromNpmPackage, PackageJson } from '../package'

/**
 * Loads all the information about a platyplus-managed package
 * @param packageName lerna-managed package name as per defined in a package.json
 * @param rootDir
 */
export const loadService = async (
  jsonPackageDir: string,
  rootDir = DEFAULT_ROOT_DIR
): Promise<Package> => {
  const packageJson = (await fs.readJson(
    join(jsonPackageDir, 'package.json')
  )) as PackageJson
  if (!packageJson.platyplus?.type)
    throw Error(`'platyplus.type' field not found in ${jsonPackageDir}.`)

  const dependencies = await getLernaDependencies(packageJson.name)
  const result = fromNpmPackage(packageJson, jsonPackageDir, rootDir) as Package
  result.type = packageJson.platyplus.type
  for (const lernaDep of dependencies) {
    await fromLernaPackage(lernaDep)
  }
  return result
}

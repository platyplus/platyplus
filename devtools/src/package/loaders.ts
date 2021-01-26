import { LernaPackage } from '@lerna/package'
import fs from '@platyplus/fs'
import { getLernaDependencies } from '@platyplus/lerna'
import getGitConfigPath from 'git-config-path'
import parseGitConfig, { Options } from 'parse-git-config'
import path from 'path'

import { DEFAULT_WORKING_DIR } from '../settings'
import { getGlobalGitAuthorInfo, getOriginUrl } from '../utils'
import { PackageInformation, PackageJson } from './types'

const fromNpmPackage = async (
  {
    name: packageName,
    platyplus,
    description,
    private: privatePackage,
    version
  }: PackageJson,
  absolutePath: string
  // rootDir = DEFAULT_WORKING_DIR
): Promise<PackageInformation> => {
  const relativePath = path.relative(DEFAULT_WORKING_DIR, absolutePath)
  const [directory, name] = relativePath.split('/')
  const pathToRoot = path.relative(absolutePath, DEFAULT_WORKING_DIR)
  // TODO REMOVE THIS CRAP
  console.log('CONFIG PATH')
  console.log(getGitConfigPath('global'))
  const globalGitConfigPath = getGitConfigPath('global')
  const config = await parseGitConfig({
    path: globalGitConfigPath
  } as Options)
  console.log(config)
  return {
    private: !!privatePackage,
    type: platyplus?.type,
    package: packageName,
    absolutePath,
    relativePath,
    pathToRoot,
    name,
    directory,
    description,
    user: await getGlobalGitAuthorInfo(),
    repository: await getOriginUrl(DEFAULT_WORKING_DIR),
    dependencies: [],
    version
  }
}

const fromLernaPackage = async ({
  location
}: LernaPackage): Promise<PackageInformation> => {
  const packageJson = await fs.readJson(path.join(location, 'package.json'))
  return fromNpmPackage(packageJson, location)
}

/**
 * Loads all the information about a platyplus-managed package
 * @param packageName lerna-managed package name as per defined in a package.json
 * @param rootDir
 */
export const loadPackageInformation = async (
  jsonPackageDir: string
): Promise<PackageInformation> => {
  const packageJson = (await fs.readJson(
    path.join(jsonPackageDir, 'package.json')
  )) as PackageJson
  if (!packageJson.platyplus?.type)
    throw Error(`'platyplus.type' field not found in ${jsonPackageDir}.`)

  const result = await fromNpmPackage(packageJson, jsonPackageDir)
  result.type = packageJson.platyplus.type
  const dependencies = await getLernaDependencies(packageJson.name)
  for (const lernaDep of dependencies) {
    result.dependencies.push(await fromLernaPackage(lernaDep))
  }
  return result
}

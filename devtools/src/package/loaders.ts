import gitConfig from 'git-config'
import objectPath from 'object-path'
import path from 'path'

import fs from '@platyplus/fs'
import { LernaPackage } from '@platyplus/lerna'

import { DEFAULT_ROOT_DIR } from '../settings'

import { PackageInformation, PackageJson } from './types'

/**
 * Creates a Package object from an npm-formatted package
 * * Note: as the format '<project-name>/<service-name>' is not standard but
 * * specific to Platyplus DevTools, this method is not put in the lerna utils package
 * @param npmPackage
 * @param rootDir
 */
export const fromNpmPackage = (
  { name: packageName, platyplus, description }: PackageJson,
  location: string,
  rootDir = DEFAULT_ROOT_DIR
): PackageInformation => {
  const [directory, name] = location.replace(`${rootDir}/`, '').split('/')
  if (!platyplus) throw Error(`${packageName}: could not find package type`)
  const git = gitConfig.sync()
  return {
    type: platyplus?.type,
    directory,
    name,
    package: packageName,
    location,
    description,
    user: {
      name: objectPath.get(git, 'user.name'),
      email: objectPath.get(git, 'user.email'),
    },
    repository: objectPath.get(git, 'remote.origin.url'),
  }
}

/**
 * Creates a Package object from a lerna-formatted package
 * * Note: as the format '<project-name>/<service-name>' is not standard but
 * * specific to Platyplus DevTools, this method is not put in the lerna utils package
 * @param lernaPackage
 * @param rootDir
 */
export const fromLernaPackage = async (
  { location }: LernaPackage,
  rootDir = DEFAULT_ROOT_DIR
): Promise<PackageInformation> => {
  const packageJson = await fs.readJson(path.join(location, 'package.json'))
  return fromNpmPackage(packageJson, location, rootDir)
}

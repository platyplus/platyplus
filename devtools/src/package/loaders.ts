import { LernaPackage } from '@platyplus/lerna'

import { DEFAULT_ROOT_DIR } from '../settings'

import { Package, PackageJson } from './types'

/**
 * Creates a Package object from an npm-formatted package
 * * Note: as the format '<project-name>/<service-name>' is not standard but
 * * specific to Platyplus DevTools, this method is not put in the lerna utils package
 * @param npmPackage
 * @param rootDir
 */
export const fromNpmPackage = (
  { name: packageName }: PackageJson,
  location: string,
  rootDir = DEFAULT_ROOT_DIR
): Package => {
  const [directory, name] = location.replace(`${rootDir}/`, '').split('/')
  return {
    directory,
    name,
    package: packageName,
    location,
  }
}

/**
 * Creates a Package object from a lerna-formatted package
 * * Note: as the format '<project-name>/<service-name>' is not standard but
 * * specific to Platyplus DevTools, this method is not put in the lerna utils package
 * @param lernaPackage
 * @param rootDir
 */
export const fromLernaPackage = (
  { location, name: packageName }: LernaPackage,
  rootDir = DEFAULT_ROOT_DIR
): Package => {
  const [directory, name] = location.replace(`${rootDir}/`, '').split('/')
  return {
    directory,
    name,
    package: packageName,
    location,
  }
}

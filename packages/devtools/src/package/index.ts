import { hasLernaPackage, LernaPackage } from '@platyplus/lerna'
import gitConfig from 'git-config'
import objectPath from 'object-path'

import { DEFAULT_ROOT_DIR } from '../config'
import { generateTemplateFiles } from '../templates'

import { Package, PackageJson } from './types'

/**
 * Generates a Typescript package ready to be used in a Lerna/Yarn workspaces environment
 * @param packageName the full name of the npm package e.g. @yourorg/a-package
 * @param path the destination package directory, e.g. packages/a-package
 * @param description
 */
export const generatePackage = async (
  packageName: string,
  path: string,
  description = 'TODO a description'
): Promise<void> => {
  // Checks if the package already exists
  if (await hasLernaPackage(packageName))
    throw Error(`${packageName} already exists.`)
  const [project, name] = path.split('/')
  const git = gitConfig.sync()
  const variables: Package = {
    description,
    package: packageName,
    project,
    name,
    path,
    location: `${DEFAULT_ROOT_DIR}/${path}`,
    user: {
      name: objectPath.get(git, 'user.name'),
      email: objectPath.get(git, 'user.email'),
    },
    repository: objectPath.get(git, 'remote.origin.url'),
  }
  await generateTemplateFiles('package', path, variables)
}

/**
 * Creates a Package object from an npm-formatted package
 * * Note: as the format '<project-name>/<service-name>' is not standard but
 * * specific to Platyplus DevTools, this method is not put in the lerna utils package
 * @param npmPackage
 * @param rootDir
 */
export const fromNpmPackage = (
  npmPackage: PackageJson,
  jsonPackageDir: string,
  rootDir = DEFAULT_ROOT_DIR
): Package => {
  const path = jsonPackageDir.replace(`${rootDir}/`, '')
  const [project, name] = path.split('/')
  return {
    project,
    name,
    path,
    package: npmPackage.name,
    location: jsonPackageDir,
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

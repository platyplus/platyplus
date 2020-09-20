import gitConfig from 'git-config'
import objectPath from 'object-path'
import { hasLernaPackage } from '@platyplus/lerna'

import { DEFAULT_ROOT_DIR, PackageType } from '../settings'
import { generateTemplateFiles } from '../templates'

import { PackageInformation } from './types'
import { DEFAULT_DESCRIPTION } from './constants'
import { syncPackageJson } from './sync-package-json'

/**
 * Generates a Typescript package ready to be used in a Lerna/Yarn workspaces environment
 * @param packageName the full name of the npm package e.g. @yourorg/a-package
 * @param packagePath the destination package directory, e.g. packages/a-package
 * @param description
 */
export const createPackage = async (
  type: PackageType,
  packageName: string,
  packagePath: string,
  description = DEFAULT_DESCRIPTION
): Promise<void> => {
  // Checks if the package already exists
  if (await hasLernaPackage(packageName))
    throw Error(`${packageName} already exists.`)
  const [directory, name] = packagePath.split('/')
  const git = gitConfig.sync()
  const location = `${DEFAULT_ROOT_DIR}/${packagePath}`
  const variables: PackageInformation = {
    type,
    description,
    package: packageName,
    directory,
    name,
    location,
    user: {
      name: objectPath.get(git, 'user.name'),
      email: objectPath.get(git, 'user.email'),
    },
    repository: objectPath.get(git, 'remote.origin.url'),
  }
  await generateTemplateFiles(variables)
  await syncPackageJson(variables)
}

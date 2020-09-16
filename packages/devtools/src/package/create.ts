import gitConfig from 'git-config'
import objectPath from 'object-path'

import { hasLernaPackage } from '@platyplus/lerna'

import { DEFAULT_ROOT_DIR } from '../config'
import { generateTemplateFiles } from '../templates'

import { Package } from './types'

/**
 * Generates a Typescript package ready to be used in a Lerna/Yarn workspaces environment
 * @param packageName the full name of the npm package e.g. @yourorg/a-package
 * @param path the destination package directory, e.g. packages/a-package
 * @param description
 */
export const createPackage = async (
  packageName: string,
  path: string,
  description = 'TODO a description'
): Promise<void> => {
  // Checks if the package already exists
  if (await hasLernaPackage(packageName))
    throw Error(`${packageName} already exists.`)
  const [directory, name] = path.split('/')
  const git = gitConfig.sync()
  const variables: Package = {
    description,
    package: packageName,
    directory,
    name,
    location: `${DEFAULT_ROOT_DIR}/${path}`,
    user: {
      name: objectPath.get(git, 'user.name'),
      email: objectPath.get(git, 'user.email'),
    },
    repository: objectPath.get(git, 'remote.origin.url'),
  }
  await generateTemplateFiles('package', path, variables)
}

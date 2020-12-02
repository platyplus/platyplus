import fs from '@platyplus/fs'
import { hasLernaPackage } from '@platyplus/lerna'
import chalk from 'chalk'
import gitConfig from 'git-config'
import objectPath from 'object-path'
import path from 'path'

import {
  DEFAULT_WORKING_DIR,
  PackageType,
  PackageTypeConfigResult,
  serviceTypesConfig
} from '../settings'
import { generatePackageTemplateFiles } from '../templates'
import { ensureWorkspace } from '../utils'
import { DEFAULT_DESCRIPTION } from './constants'
import { syncPackageJson } from './sync-package-json'
import { PackageInformation } from './types'

/**
 * Generates a Typescript package ready to be used in a Lerna/Yarn workspaces environment
 * @param packageName the full name of the npm package e.g. @yourorg/a-package
 * @param relativePath the destination package directory, e.g. packages/a-package
 * @param description
 */
export const createPackage = async (
  type: PackageType,
  packageName: string,
  relativePath: string,
  description = DEFAULT_DESCRIPTION,
  privatePackage = true
): Promise<PackageTypeConfigResult> => {
  // Checks if the package already exists
  if (await hasLernaPackage(packageName))
    throw Error(`${packageName} already exists.`)
  const git = gitConfig.sync()
  if (await fs.pathExists(relativePath))
    throw Error(`The directory "${relativePath}" already exists.`)
  const absolutePath = path.join(path.join(DEFAULT_WORKING_DIR, relativePath))
  await fs.ensureDir(absolutePath)
  const pathToRoot = path.relative(absolutePath, DEFAULT_WORKING_DIR)
  const [directory, name] = relativePath.split('/')
  const variables: PackageInformation = {
    private: privatePackage,
    type,
    description,
    package: packageName,
    absolutePath,
    relativePath,
    pathToRoot,
    name,
    directory,
    user: {
      name: objectPath.get(git, 'user.name'),
      email: objectPath.get(git, 'user.email')
    },
    repository: objectPath.get(git, 'remote.origin.url'),
    dependencies: [],
    version: '0.0.1'
  }
  // * Checks the package is in a workspace
  await ensureWorkspace(absolutePath)

  const settings = serviceTypesConfig[type](variables)
  await settings.init?.()
  await generatePackageTemplateFiles(variables)
  await syncPackageJson(variables)
  await settings.postInstall?.()
  console.log(chalk.green(`Package ${packageName} created in ${location}`))
  return settings
}

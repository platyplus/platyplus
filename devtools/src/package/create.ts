import fs from '@platyplus/fs'
import { hasLernaPackage } from '@platyplus/lerna'
import chalk from 'chalk'
import path from 'path'

import {
  DEFAULT_WORKING_DIR,
  PackageType,
  PackageTypeConfigResult,
  serviceTypesConfig
} from '../settings'
import { generatePackageTemplateFiles } from '../templates'
import { ensureWorkspace, getGlobalGitAuthorInfo, getOriginUrl } from '../utils'
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
  absolutePath: string,
  description = DEFAULT_DESCRIPTION,
  privatePackage = true
): Promise<PackageTypeConfigResult> => {
  // Checks if the package already exists
  if (await hasLernaPackage(packageName))
    throw Error(`${packageName} already exists.`)

  if (await fs.pathExists(absolutePath))
    throw Error(`The directory "${absolutePath}" already exists.`)
  if (!path.isAbsolute(absolutePath))
    absolutePath = path.join(DEFAULT_WORKING_DIR, absolutePath)
  const relativePath = path.relative(DEFAULT_WORKING_DIR, absolutePath)
  const pathToRoot = path.relative(absolutePath, DEFAULT_WORKING_DIR)
  const [projectPath, name] = relativePath.split('/')
  const variables: PackageInformation = {
    private: privatePackage,
    type,
    description,
    package: packageName,
    absolutePath,
    relativePath,
    pathToRoot,
    name,
    directory: projectPath,
    user: await getGlobalGitAuthorInfo(),
    repository: await getOriginUrl(DEFAULT_WORKING_DIR),
    dependencies: [],
    version: '0.0.1'
  }

  const settings = serviceTypesConfig[type](variables)
  await settings.init?.()
  await fs.ensureDir(absolutePath)
  await generatePackageTemplateFiles(variables)
  // * Checks the package is in a workspace
  await ensureWorkspace(absolutePath)
  await syncPackageJson(variables)
  await settings.postInstall?.()
  console.log(chalk.green(`Package ${packageName} created in ${relativePath}`))
  return settings
}

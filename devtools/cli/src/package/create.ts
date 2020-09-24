import fs from '@platyplus/fs'
import { hasLernaPackage } from '@platyplus/lerna'
import chalk from 'chalk'
import gitConfig from 'git-config'
import objectPath from 'object-path'
import path from 'path'

import {
  DEFAULT_WORKING_DIR,
  PackageType,
  serviceTypesConfig
} from '../settings'
import { generateTemplateFiles } from '../templates'
import { ensureWorkspace } from '../utils'
import { DEFAULT_DESCRIPTION } from './constants'
import { syncPackageJson } from './sync-package-json'
import { PackageInformation, PackageJson } from './types'

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
  const location = `${DEFAULT_WORKING_DIR}/${packagePath}`
  if (await fs.pathExists(location))
    throw Error(`The directory "${location}" already exists.`)
  else await fs.ensureDir(path.join(DEFAULT_WORKING_DIR, directory))

  const variables: PackageInformation = {
    type,
    description,
    package: packageName,
    directory,
    name,
    location,
    user: {
      name: objectPath.get(git, 'user.name'),
      email: objectPath.get(git, 'user.email')
    },
    repository: objectPath.get(git, 'remote.origin.url'),
    dependencies: []
  }
  // * Checks the package is in a workspace
  await ensureWorkspace([`${directory}/${name}`, `${directory}/**`])

  const mainPackageJsonPath = path.join(DEFAULT_WORKING_DIR, 'package.json')
  const mainPackageJson: PackageJson = await fs.readJson(mainPackageJsonPath)
  const exists = (mainPackageJson.workspaces?.packages || []).find(
    (glob) => glob === `${directory}/${name}` || glob === `${directory}/**`
  )
  if (!exists) {
    objectPath.push(
      mainPackageJson,
      'workspaces.packages',
      `${directory}/${name}`
    )
    await fs.writeJson(mainPackageJsonPath, mainPackageJson, { spaces: '  ' })
  }
  const settings = serviceTypesConfig[type](variables)
  await settings.init?.()
  await generateTemplateFiles(variables)
  await syncPackageJson(variables)
  await settings.postInstall?.()
  console.log(
    chalk.green(`Package ${packageName} created in ${directory}/${name}`)
  )
}

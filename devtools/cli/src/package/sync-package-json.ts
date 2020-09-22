import fs from '@platyplus/fs'
import handlebars from 'handlebars'
import path from 'path'

import { PackageType } from '../settings'
import { DEFAULT_DESCRIPTION } from './constants'
import { PackageInformation, PackageJson } from './types'

const standard: PackageJson = {
  name: '{{package}}', // * override
  private: false,
  platyplus: {
    type: '{{type}}' as PackageType // * override
  },
  version: '0.0.1',
  description: '{{description}}', // * override?
  author: '{{user.name}} <{{user.email}}>',
  homepage: '{{repository}}',
  repository: {
    type: 'git',
    url: '{{repository}}',
    directory: '{{path}}'
  },
  license: 'ISC'
}

const defaultPackageJson = (variables: PackageInformation): PackageJson => {
  const template = JSON.stringify(standard)
  const strResult = handlebars.compile(template)(variables)
  return JSON.parse(strResult)
}

export const syncPackageJson = async (
  variables: PackageInformation
): Promise<void> => {
  const defaults = defaultPackageJson(variables)
  const packageJsonPath = path.join(variables.location, 'package.json')
  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = await fs.readJSON(packageJsonPath)
    packageJson.name = defaults.name
    packageJson.platyplus = defaults.platyplus
    if (variables.description !== DEFAULT_DESCRIPTION)
      packageJson.description = defaults.description
    await fs.outputJson(packageJsonPath, packageJson, { spaces: '  ' })
  } else {
    await fs.outputJson(packageJsonPath, defaults, { spaces: '  ' })
  }
}

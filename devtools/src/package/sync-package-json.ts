import fs from '@platyplus/fs'
import handlebars from 'handlebars'
import path from 'path'

import { DEFAULT_DESCRIPTION } from './constants'
import { PackageInformation, PackageJson } from './types'

// TODO move to a dedicated file
const standard = `{
  "name": "{{package}}",
  "private": {{private}},
  "platyplus": {
    "type": "{{type}}"
  },
  "version": "0.0.1",
  "description": "{{description}}",
  "author": "{{user.name}} <{{user.email}}>",
  "homepage": "{{repository}}",
  "repository": {
    "type": "git",
    "url": "{{repository}}",
    "directory": "{{relativePath}}"
  },
  "license": "MIT",
  "publishConfig": {
    "access": "public"
  }
}`

const defaultPackageJson = (variables: PackageInformation): PackageJson => {
  const strResult = handlebars.compile(standard)(variables)
  return JSON.parse(strResult)
}

export const syncPackageJson = async (
  variables: PackageInformation
): Promise<void> => {
  const defaults = defaultPackageJson(variables)
  const packageJsonPath = path.join(variables.absolutePath, 'package.json')
  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = await fs.readJSON(packageJsonPath)
    packageJson.name = defaults.name
    packageJson.platyplus = {
      ...(packageJson.platyplus || {}),
      ...defaults.platyplus
    }
    if (variables.description !== DEFAULT_DESCRIPTION)
      packageJson.description = defaults.description
    await fs.outputJson(packageJsonPath, packageJson, { spaces: '  ' })
  } else {
    await fs.outputJson(packageJsonPath, defaults, { spaces: '  ' })
  }
}

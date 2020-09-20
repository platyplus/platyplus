import handlebars from 'handlebars'
import path from 'path'

import fs from '@platyplus/fs'
import { PackageType } from '../settings'
import { PackageInformation, PackageJson } from './types'
import { DEFAULT_DESCRIPTION } from './constants'

const standard: PackageJson = {
  name: '{{package}}', // * override
  private: false,
  platyplus: {
    type: PackageType.Hasura, // * override
  },
  version: '0.0.1',
  description: '{{description}}', // * override?
  author: '{{user.name}} <{{user.email}}>',
  homepage: '{{repository}}',
  repository: {
    type: 'git',
    url: '{{repository}}',
    directory: '{{path}}',
  },
  license: 'ISC',
  // * Depends on package type
  main: 'dist/index.js',
  // * Depends on package type
  types: 'dist/index.d.ts',
  files: ['dist/**/*'],
  publishConfig: {
    access: 'public',
  },
  scripts: {
    // * Depends on package type
    prepublish: 'yarn run build',
    build: 'yarn run clean && tsc -p tsconfig.build.json',
    test: 'echo "Error: run tests from root" && exit 1',
    clean: 'rimraf dist',
  },
  devDependencies: {
    // * Depends on package type - install in create script
    rimraf: '^3.0.2',
    'tsconfig-paths': '^3.9.0',
  },
}

const defaultPackageJson = <T extends PackageInformation>(
  variables: T
): PackageJson => {
  const template = JSON.stringify(standard)
  const strResult = handlebars.compile(template)(variables)
  return JSON.parse(strResult)
}

export const syncPackageJson = async (variables: PackageInformation) => {
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

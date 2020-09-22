import fs from '@platyplus/fs'
import { execSync } from 'child_process'
import objectPath from 'object-path'
import path from 'path'

import { PackageJson } from '../package'
import { DEFAULT_WORKING_DIR } from '../settings'

export const globalPath = (): string =>
  execSync('yarn global bin').toString().trim()

export const ensureWorkspace = async (
  workspaces: string | string[],
  repoPath = DEFAULT_WORKING_DIR
): Promise<void> => {
  if (typeof workspaces === 'string') workspaces = [workspaces]
  const mainPackageJsonPath = path.join(repoPath, 'package.json')
  const mainPackageJson: PackageJson = await fs.readJson(mainPackageJsonPath)
  const exists = (mainPackageJson.workspaces?.packages || []).find((glob) =>
    workspaces.includes(glob)
  )
  if (!exists) {
    objectPath.push(mainPackageJson, 'workspaces.packages', workspaces[0]) // ! Will only add the first element of the array
    await fs.writeJson(mainPackageJsonPath, mainPackageJson, { spaces: '  ' })
  }
}

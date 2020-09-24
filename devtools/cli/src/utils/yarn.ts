import fs from '@platyplus/fs'
import { execSync } from 'child_process'
import objectPath from 'object-path'
import path from 'path'

import { PackageJson } from '../package'
import { DEFAULT_WORKING_DIR } from '../settings'

export const globalPath = (): string =>
  execSync('yarn global bin').toString().trim()

export const ensureWorkspace = async (
  workspace: string,
  repoPath = DEFAULT_WORKING_DIR
): Promise<void> => {
  const workspaces = [workspace]
  if (!workspace.endsWith('/*')) {
    workspaces.push(path.join(workspace, '../*'))
  }
  const mainPackageJsonPath = path.join(repoPath, 'package.json')
  const mainPackageJson: PackageJson = await fs.readJson(mainPackageJsonPath)
  const exists = (mainPackageJson.workspaces?.packages || []).find((glob) =>
    workspaces.includes(glob)
  )
  if (!exists) {
    objectPath.push(mainPackageJson, 'workspaces.packages', workspace)
    await fs.writeJson(mainPackageJsonPath, mainPackageJson, { spaces: '  ' })
  }
}

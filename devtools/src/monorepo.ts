import fs from '@platyplus/fs'
import path from 'path'

import { DEFAULT_ROOT_DIR } from './settings'

const lerna = {
  npmClient: 'yarn',
  useWorkspaces: true,
}

export const initMonorepo = async (name: string, organisation = name) => {
  if (!organisation.startsWith('@')) organisation = `@${organisation}`
  const lernaPath = path.join(DEFAULT_ROOT_DIR, name)
  await fs.outputJson(lernaPath, lerna)
  console.log(name, organisation)
}

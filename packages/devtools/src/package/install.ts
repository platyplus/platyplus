import { join } from 'path'
import fs from '@platyplus/fs'
import { Package } from './types'

export const getInstallFiles = ({
  directory,
  name,
  location
}: Package): { path: string; installFiles: string } => {
  const path = `${directory}/${name}`
  const list = [`${path}/package.json`]
  if (fs.pathExistsSync(join(location, 'yarn.lock')))
    list.push(`${path}/yarn.lock`)
  return { path, installFiles: list.join(' ') }
}

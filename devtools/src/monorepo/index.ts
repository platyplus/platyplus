import fs from '@platyplus/fs'
import chalk from 'chalk'
import { execSync } from 'child_process'
import git from 'isomorphic-git'
import path from 'path'

import { DEFAULT_WORKING_DIR } from '../settings'
import { generateTemplateFiles } from '../templates'
import { getGlobalGitAuthorInfo } from '../utils'

export const initMonorepo = async (
  name: string,
  organisation = name,
  description = ''
): Promise<void> => {
  const dir = path.join(DEFAULT_WORKING_DIR, name)
  if (await fs.pathExists(dir))
    throw Error(`The directory "${name}" already exists`)
  if (!organisation.startsWith('@')) {
    organisation = `@${organisation}`
    console.log(chalk.green(`Changed organisation to "${organisation}"`))
  }

  // * Generate monorepo files from template
  await generateTemplateFiles('monorepo', dir, {
    name,
    organisation,
    description
  })

  // * Install dependencies
  execSync('yarn', {
    cwd: dir,
    stdio: 'inherit'
  })

  await git.init({ fs, dir })
  await git.add({ fs, dir, filepath: '.' })
  await git.commit({
    fs,
    dir,
    author: await getGlobalGitAuthorInfo(),
    message: 'feat: initial commit'
  })
  console.log(chalk.green('Monorepo created.'))
}

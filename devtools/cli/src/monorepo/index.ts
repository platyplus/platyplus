import fs from '@platyplus/fs'
import chalk from 'chalk'
import { execSync } from 'child_process'
import path from 'path'

import { DEFAULT_WORKING_DIR } from '../settings'
import { generateTemplateFiles } from '../templates'

export const initMonorepo = async (
  name: string,
  organisation = name
): Promise<void> => {
  const projectPath = path.join(DEFAULT_WORKING_DIR, name)
  if (await fs.pathExists(projectPath))
    throw Error(`The directory "${name}" already exists`)
  if (!organisation.startsWith('@')) {
    organisation = `@${organisation}`
    console.log(chalk.green(`Changed organisation to "${organisation}"`))
  }

  // * Generate monorepo files from template
  await generateTemplateFiles('monorepo', projectPath, { name, organisation })

  // * Install dependencies
  execSync('yarn', {
    cwd: projectPath,
    stdio: 'inherit'
  })

  console.log(chalk.green('Monorepo created.'))
}

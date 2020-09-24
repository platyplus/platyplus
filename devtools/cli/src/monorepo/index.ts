import fs from '@platyplus/fs'
import chalk from 'chalk'
import path from 'path'

import { DEFAULT_WORKING_DIR } from '../settings'
import { templateToFile } from '../templates'

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

  const source = path.join(__dirname, '../templates/monorepo')
  for await (const file of fs.glob.sync(path.join(source, '**'), {
    nodir: true
  })) {
    const destFile = file.replace(`${source}/`, '')
    await templateToFile(file, path.join(projectPath, destFile), {
      name,
      organisation
    })
  }

  console.log(chalk.green('Monorepo created.'))
}

import { glob } from '@platyplus/fs'
import inquirer from 'inquirer'
import path from 'path'
import yargs, { boolean, CommandModule } from 'yargs'

import { listProjects, syncProject } from '../../project'
import { DEFAULT_WORKING_DIR } from '../../settings'
import { helmVersion } from '../../utils'
import { error } from '../error'

type Args = { path: string[] }

export const versionChart: CommandModule<unknown, Args> = {
  command: 'chart <path..>',
  describe:
    'generate a new version for a given Helm Chart according to conventional changelog',
  builder: (yargs) =>
    yargs.positional('path', {
      describe: 'path(s) of the helm chart(s)',
      array: true,
      type: 'string',
      demandOption: true
    }),
  handler: async ({ path }) => {
    try {
      for (const p of path) {
        await helmVersion(p, {
          gitDir: DEFAULT_WORKING_DIR,
          additionalPaths: [p],
          addAll: true,
          tagName: p
        })
      }
    } catch (e) {
      error(e)
    }
  }
}

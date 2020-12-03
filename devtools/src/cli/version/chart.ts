import { execSync } from 'child_process'
import { CommandModule } from 'yargs'

import { DEFAULT_WORKING_DIR, helmVersion } from '../..'
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
          tagName: p,
          push: false
        })
      }
      execSync('git push', {
        cwd: DEFAULT_WORKING_DIR,
        stdio: 'inherit'
      })
    } catch (e) {
      error(e)
    }
  }
}

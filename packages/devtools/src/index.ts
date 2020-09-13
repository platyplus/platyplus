import yargs from 'yargs'
import { runSkaffold } from './skaffold'

yargs.command(
  'skaffold <project>',
  'Run skaffold for the given project',
  (yargs) => {
    yargs.positional('project', {
      describe: 'project (lerna sub-folder) to skaffold',
    })
  },
  async (argv) => {
    try {
      await runSkaffold(argv.project as string)
    } catch (error) {
      console.error(error.message)
    }
  }
).argv

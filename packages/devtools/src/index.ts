import yargs from 'yargs'
import { generatePackage } from './package'
import { runSkaffold } from './skaffold'
import childprocess from 'child_process'

yargs
  .scriptName('pdt')
  .command<{ project: string }>(
    'skaffold <project>',
    'Runs skaffold for the given project',
    (yargs) => {
      yargs.positional('project', {
        describe: 'project (lerna sub-folder) to skaffold',
      })
    },
    async (argv) => {
      try {
        await runSkaffold(argv.project)
      } catch (error) {
        console.error(error.message)
      }
    }
  )
  .command<{ name: string; dirname: string; description?: string }>(
    'package create <name> <dirname> [description]',
    'Creates a Typescript package boilerplate',
    (yargs) => {
      yargs
        .positional('name', {
          describe: 'Package name',
        })
        .positional('dirname', {
          describe: 'Package directory',
        })
    },
    async (argv) => {
      try {
        await generatePackage(argv.name, argv.dirname, argv.description)
      } catch (error) {
        console.error(error.message)
      }
    }
  )
  .strict()
  .demandCommand(1)
  .wrap(null).argv

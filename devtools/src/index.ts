import yargs from 'yargs'
import { createPackage } from './package'
import { syncProject } from './project'
import { runSkaffoldDev } from './skaffold'

yargs
  .scriptName('pdt')
  .command<{ project: string }>(
    'skaffold <project>',
    'Runs skaffold for the given project',
    yargs => {
      yargs.positional('project', {
        describe: 'project (lerna sub-folder) to skaffold'
      })
    },
    async argv => {
      try {
        await runSkaffoldDev(argv.project)
      } catch (error) {
        console.error(error.message)
      }
    }
  )
  .command<{ name: string; dirname: string; description?: string }>(
    'package create <name> <dirname> [description]',
    'Creates a Typescript package boilerplate',
    yargs => {
      yargs
        .positional('name', {
          describe: 'Package name'
        })
        .positional('dirname', {
          describe: 'Package directory'
        })
    },
    async ({ name, dirname, description }) => {
      try {
        await createPackage(name, dirname, description)
      } catch (error) {
        console.error(error.message)
      }
    }
  )
  .command<{ project: string }>(
    'sync <project>',
    'Synchronises the project files. Create/update skaffold, and overrides dockerfiles',
    yargs => {
      yargs.positional('project', {
        describe: 'project (lerna sub-folder) to skaffold'
      })
    },
    async ({ project }) => {
      try {
        await syncProject(project)
      } catch (error) {
        console.error(error.message)
      }
    }
  )
  .strict()
  .demandCommand(1)
  .wrap(null).argv

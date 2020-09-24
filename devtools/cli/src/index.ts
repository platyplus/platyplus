#!/usr/bin/env node
import chalk from 'chalk'
import yargs from 'yargs'

import { initMonorepo } from './monorepo'
import { createPackage } from './package'
import { createProject, listProjects, syncProject } from './project'
import { PackageType } from './settings'
import { runSkaffoldDev } from './skaffold'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const error = (e: any) => {
  console.log(chalk.bold.red(e.message))
  process.exit(1)
}

yargs
  .scriptName('platy')
  .command<{ monorepoName: string; organisationName: string }>(
    'init <monorepo-name> <organisation-name>',
    'Initialize a monorepo',
    (yargs) => {
      yargs
        .positional('monorepo-name', {
          describe: 'name of the project to skaffold'
        })
        .positional('organisation-name', {
          describe: 'name of the organisation (e.g. @my-org)'
        })
    },
    async ({ monorepoName, organisationName }) => {
      try {
        await initMonorepo(monorepoName, organisationName)
      } catch (e) {
        error(e)
      }
    }
  )
  .command<{ project: string }>(
    'skaffold <project>',
    'Starts the given project with `skaffold dev`',
    (yargs) => {
      yargs.positional('project', {
        describe: 'name of the project to skaffold'
      })
    },
    async (argv) => {
      try {
        await runSkaffoldDev(argv.project)
      } catch (e) {
        error(e)
      }
    }
  )
  .command<{
    type: PackageType
    name: string
    destination: string
    description?: string
  }>(
    'create package <type> <name> <destination> [description]',
    'Creates a package',
    (yargs) => {
      yargs
        .positional('type', {
          describe: 'Service type',
          choices: Object.values(PackageType)
        })
        .positional('name', {
          describe: 'Package name'
        })
        .positional('destination', {
          describe: 'Package directory'
        })
    },
    async ({ type, name, destination, description }) => {
      try {
        // TODO warns if dependencies are not met e.g. hasura console is not installed for an hasura package
        await createPackage(type, name, destination, description)
      } catch (e) {
        error(e)
      }
    }
  )

  // TODO init (create lerna, base tsconfigs, default @org/package directory, warns when something required is not installed e.g. skaffold, helm...)
  // TODO add service <name> <project>
  // TODO post-install @platyplus/devtools: launch the script to check/warn dependencies
  // TODO -> https://www.npmjs.com/package/which
  // ? sync package <name>

  .command<{ name: string; directory: string; description?: string }>(
    'create project <name> <directory> [description]',
    'Creates a new project in the given directory',
    (yargs) => {
      yargs
        .positional('name', {
          describe: 'project name'
        })
        .positional('directory', {
          describe: 'project directory'
        })
        .positional('description', {
          describe: 'project description'
        })
    },
    async ({ name, directory, description }) => {
      try {
        await createProject(name, directory, description)
      } catch (e) {
        error(e)
      }
    }
  )
  .command<{ project: string }>(
    'sync <project>',
    'Synchronises the project files. Create/update skaffold, and overrides dockerfiles',
    (yargs) => {
      yargs.positional('project', {
        describe: 'project (lerna sub-folder) to skaffold'
      })
    },
    async ({ project }) => {
      try {
        await syncProject(project)
      } catch (e) {
        error(e)
      }
    }
  )
  .command(
    'list projects',
    'Lists all the projects available in the current monorepo',
    async () => {
      console.log('NAME\tLOCATION')
      try {
        for (const project of await listProjects()) {
          console.log(`${project.name}\t./${project.directory}`)
        }
      } catch (e) {
        error(e)
      }
    }
  )
  .showHelpOnFail(true)
  .demandCommand()
  .completion('completion', 'Generates the autocompletion scripts')
  .wrap(null).argv

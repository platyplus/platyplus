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
  .command<{ name: string; organisation?: string }>(
    'init <name> [organisation]',
    'initialize new monorepo',
    (yargs) => {
      yargs
        .positional('name', {
          describe: 'directory name of the monorepo'
        })
        .option('organisation', {
          describe: 'name of the organisation (e.g. @my-org)',
          defaultDescription: "name of the monorepo with a '@' prefix"
        })
    },
    async ({ name, organisation }) => {
      try {
        await initMonorepo(name, organisation)
      } catch (e) {
        error(e)
      }
    }
  )
  .command<{ project: string }>(
    'skaffold <project>',
    'run `skaffold dev`',
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
  .command('create', 'create new [project|package]', (yargs) => {
    yargs
      .usage('Usage: $0 create <project|package> [options]')
      .command<{
        type: PackageType
        name?: string
        path: string
        description?: string
      }>(
        'package <type> <path> [name]',
        'create new package',
        (yargs) => {
          yargs
            .positional('type', {
              describe: 'type',
              choices: Object.values(PackageType)
            })
            .positional('path', {
              describe: 'path of the package from the monorepo root'
            })
            .positional('name', {
              describe: 'name field in package.json',
              defaultDescription: "package's directory"
            })
            .option('description', {
              alias: 'd',
              describe: 'description field in package.json'
            })
        },
        async ({ type, name, path, description }) => {
          try {
            if (!name) name = path.split('/').pop() as string
            // TODO warns/exists if dependencies are not met e.g. hasura console is not installed for an hasura package
            await createPackage(type, name, path, description)
          } catch (e) {
            error(e)
          }
        }
      )

      .command<{ name?: string; path: string; description?: string }>(
        'project <path> [name]',
        'create new project',
        (yargs) => {
          yargs
            .positional('path', {
              describe: 'path of the project from the monorepo root'
            })
            .positional('name', {
              describe: 'project name',
              defaultDescription: "project's directory"
            })
            .option('description', {
              alias: 'd',
              describe: 'short description of the project'
            })
        },
        async ({ name, path, description }) => {
          try {
            if (!name) name = path.split('/').pop() as string
            await createProject(name, path, description)
          } catch (e) {
            error(e)
          }
        }
      )
      .demandCommand()
  })

  // TODO init (create lerna, base tsconfigs, default @org/package directory, warns when something required is not installed e.g. skaffold, helm...)
  // TODO add service <name> <project>
  // TODO post-install @platyplus/devtools: launch the script to check/warn dependencies
  // TODO -> https://www.npmjs.com/package/which
  // ? sync package <name>

  .command<{ project: string }>(
    'sync <project>',
    'synchronise project files. Create/update skaffold, and overrides dockerfiles',
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
    'list all available projects in the current monorepo',
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
  .completion()
  .wrap(null).argv

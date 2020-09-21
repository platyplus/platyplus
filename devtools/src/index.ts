import yargs from 'yargs'
import { createPackage } from './package'
import { syncProject } from './project'
import { PackageType } from './settings'
import { runSkaffoldDev } from './skaffold'

// TODO some colors
yargs
  .scriptName('platy')
  .command<{ project: string }>(
    'skaffold <project> [...skaffold command and arguments]',
    'Runs skaffold for the given project',
    (yargs) => {
      yargs.positional('project', {
        describe: 'project (lerna sub-folder) to skaffold',
      })
    },
    async (argv) => {
      try {
        await runSkaffoldDev(argv.project)
      } catch (error) {
        console.error(error.message)
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
          choices: Object.values(PackageType),
        })
        .positional('name', {
          describe: 'Package name',
        })
        .positional('destination', {
          describe: 'Package directory',
        })
    },
    async ({ type, name, destination, description }) => {
      try {
        // TODO warns if dependencies are not met e.g. hasura console is not installed for an hasura package
        await createPackage(type, name, destination, description)
      } catch (error) {
        console.error(error.message)
      }
    }
  )
  // TODO init (create lerna, warns when something required is not installed e.g. skaffold, helm...)
  // TODO create project (create the folder, the workspace in package.json and config.yaml)
  // TODO list projects
  // TODO add service <name> <project (lerna sub-folder)>
  // TODO post-install @platyplus/devtools: launch the script to check/warn dependencies
  // TODO -> https://www.npmjs.com/package/which
  // ? sync package <name>
  .command<{ project: string }>(
    'sync <project>',
    'Synchronises the project files. Create/update skaffold, and overrides dockerfiles',
    (yargs) => {
      yargs.positional('project', {
        describe: 'project (lerna sub-folder) to skaffold',
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

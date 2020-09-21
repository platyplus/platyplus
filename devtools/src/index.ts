import yargs from 'yargs'
import { createPackage } from './package'
import { createProject, listProjects, syncProject } from './project'
import { PackageType } from './settings'
import { runSkaffoldDev } from './skaffold'

// TODO some colors
yargs
  .scriptName('platy')
  .command<{ project: string }>(
    'skaffold <project>',
    'Starts the given project with `skaffold dev`',
    (yargs) => {
      yargs.positional('project', {
        describe: 'name of the project to skaffold',
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
  // TODO add service <name> <project (lerna sub-folder)>
  // TODO post-install @platyplus/devtools: launch the script to check/warn dependencies
  // TODO -> https://www.npmjs.com/package/which
  // ? sync package <name>

  .command<{ name: string; directory: string; description?: string }>(
    'create project <name> <directory> [description]',
    'Creates a new project in the given directory',
    (yargs) => {
      yargs
        .positional('name', {
          describe: 'project name',
        })
        .positional('directory', {
          describe: 'project directory',
        })
        .positional('description', {
          describe: 'project description',
        })
    },
    async ({ name, directory, description }) => {
      try {
        await createProject(name, directory, description)
      } catch (error) {
        console.error(error.message)
      }
    }
  )
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
  .command(
    'list projects',
    'Lists all the projects available in the current monorepo',
    () => {},
    async () => {
      console.log('NAME\tLOCATION')
      try {
        for (const project of await listProjects()) {
          console.log(`${project.name}\t./${project.directory}`)
        }
      } catch (error) {
        console.error(error.message)
      }
    }
  )
  .strict()
  .demandCommand(1)
  .completion('completion', 'Generates the autocompletion scripts')
  .wrap(null).argv

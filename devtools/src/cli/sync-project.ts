import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { listProjects, syncProject as sync } from '../project'
import { error } from './error'

type args = {
  project?: string
  all?: boolean
}

export const syncProject: CommandModule<args> = {
  command: 'sync [project]',
  describe:
    'synchronise project files. Create/update skaffold, and overrides dockerfiles',
  builder: (yargs) =>
    yargs
      .positional('project', {
        describe: 'name of the project to synchronise'
      })
      .option('all', {
        describe: 'sync all the projects of the monorepo',
        type: 'boolean',
        default: false
      }),
  handler: async (options) => {
    const projects = await (await listProjects()).map((p) => p.name)
    if (!projects.length)
      throw Error(
        "No project found in the repo. Please create a project first in running 'platy create project <name>'."
      )
    const answers = await inquirer.prompt<Required<args>>([
      {
        name: 'project',
        type: 'list',
        when: !options.project && !options.all,
        choices: projects
      }
    ])
    const { project } = { ...options, ...answers }
    const list = options.all ? projects : [project]
    try {
      for (const p of list) {
        await sync(p)
      }
    } catch (e) {
      error(e)
    }
  }
}

import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { syncProject as sync } from '../project'
import { error } from './error'
import { requiredProjectList } from './list/projects'

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
    const projects = await requiredProjectList()
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

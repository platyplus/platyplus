import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { runSkaffoldDev } from '../skaffold'
import { error } from './error'
import { requiredProjectList } from './list/projects'

type Args = {
  project?: string
}

export const dev: CommandModule<Args> = {
  command: 'dev [project]',
  describe: 'run `skaffold dev` for the given project',
  builder: yargs =>
    yargs.positional('project', {
      type: 'string',
      describe: 'name of the project to skaffold'
    }),
  handler: async options => {
    const projects = await requiredProjectList()
    const answers = await inquirer.prompt<Required<Args>>([
      {
        name: 'project',
        type: 'list',
        when: !options.project,
        choices: projects
      }
    ])
    const { project } = { ...options, ...answers }
    try {
      await runSkaffoldDev(project)
    } catch (e) {
      error(e)
    }
  }
}

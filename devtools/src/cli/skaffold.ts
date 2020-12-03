import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { runSkaffoldDev } from '../skaffold'
import { error } from './error'
import { requiredProjectList } from './list/projects'

type args = {
  project?: string
}

export const runSkaffold: CommandModule<args> = {
  command: 'skaffold [project]',
  describe: 'run `skaffold dev`',
  builder: (yargs) =>
    yargs.positional('project', {
      describe: 'name of the project to skaffold'
    }),
  handler: async (options) => {
    const projects = await requiredProjectList()
    const answers = await inquirer.prompt<Required<args>>([
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

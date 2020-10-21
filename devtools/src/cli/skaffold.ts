import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { listProjects } from '../project'
import { runSkaffoldDev } from '../skaffold'
import { error } from './error'

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
    const projects = await listProjects()
    if (!projects.length)
      throw Error(
        "No project found in the repo. Please create a project first in running 'platy create project <name>'."
      )
    const answers = await inquirer.prompt<Required<args>>([
      {
        name: 'project',
        type: 'list',
        when: !options.project,
        choices: projects.map((p) => p.name)
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

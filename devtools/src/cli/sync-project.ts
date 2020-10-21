import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { listProjects, syncProject as sync } from '../project'
import { error } from './error'

type args = {
  project?: string
}

export const syncProject: CommandModule<args> = {
  command: 'sync <project>',
  describe:
    'synchronise project files. Create/update skaffold, and overrides dockerfiles',
  builder: (yargs) =>
    yargs.positional('project', {
      describe: 'name of the project to synchronise'
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
      await sync(project)
    } catch (e) {
      error(e)
    }
  }
}

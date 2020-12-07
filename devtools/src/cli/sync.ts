import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { getProject, listProjects, syncProject } from '../project'
import { error } from './error'

type Args = {
  project?: string
  all: boolean
}

export const sync: CommandModule<Partial<Args>, Args> = {
  command: 'sync [project]',
  describe:
    'synchronise project files. Create/update skaffold, and overrides dockerfiles',
  builder: yargs =>
    yargs
      .positional('project', {
        type: 'string',
        describe: 'name of the project to synchronise'
      })
      .option('all', {
        describe: 'sync all the projects of the monorepo',
        type: 'boolean',
        default: false
      }),
  handler: async options => {
    const projects = await listProjects()
    if (projects.length) {
      const answers = await inquirer.prompt<Required<Args>>([
        {
          name: 'project',
          type: 'list',
          when: !options.project && !options.all,
          choices: projects
        }
      ])
      const { project } = { ...options, ...answers }
      const list = options.all ? projects : [await getProject(project)]
      try {
        for (const { name } of list) {
          await syncProject(name)
        }
      } catch (e) {
        error(e)
      }
    } else {
      console.log('This repository has no project, nothing to synchronise.')
    }
  }
}

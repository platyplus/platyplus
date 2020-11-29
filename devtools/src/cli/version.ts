import inquirer from 'inquirer'
import path from 'path'
import { CommandModule } from 'yargs'

import { listProjects, syncProject } from '../project'
import { DEFAULT_WORKING_DIR } from '../settings'
import { helmVersion } from '../utils'
import { error } from './error'

type args = {
  project?: string
  all?: boolean
}

export const versionProject: CommandModule<args> = {
  command: 'version [project]',
  describe:
    'generate a new version for the Helm Chart of the project according to convetional changelog',
  builder: (yargs) =>
    yargs
      .positional('project', {
        describe: 'name of the project to version'
      })
      .option('all', {
        describe:
          'generate versions for all the projects present in the repository',
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
        await syncProject(p)
        await helmVersion(path.join(p, 'helm'), {
          gitDir: DEFAULT_WORKING_DIR,
          additionalPaths: [p],
          addAll: true,
          tagName: p
        })
      }
    } catch (e) {
      error(e)
    }
  }
}

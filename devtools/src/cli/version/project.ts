import { execSync } from 'child_process'
import inquirer from 'inquirer'
import path from 'path'
import { CommandModule } from 'yargs'

import { getProject, listProjects, syncProject } from '../../project'
import { DEFAULT_WORKING_DIR } from '../../settings'
import { helmVersion } from '../../utils'
import { error } from '../error'
import { requiredProjectList } from '../list/projects'

type InArgs = {
  project?: string
  all?: boolean
}

type OutArgs = InArgs & Required<Pick<InArgs, 'all'>>

export const versionProject: CommandModule<InArgs, OutArgs> = {
  command: 'project [project]',
  describe:
    'generate a new version for the Helm Chart of the project according to conventional changelog',
  builder: (yargs) =>
    yargs
      .positional('project', {
        describe: 'name of the project to version',
        type: 'string'
      })
      .option('all', {
        describe:
          'generate versions for all the projects present in the repository',
        type: 'boolean',
        default: false
      }),
  handler: async (options) => {
    const projects = await listProjects()
    if (projects.length) {
      const answers = await inquirer.prompt<Required<InArgs>>([
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
          await helmVersion(path.join(name, 'helm'), {
            gitDir: DEFAULT_WORKING_DIR,
            additionalPaths: [name],
            addAll: true,
            tagName: name,
            push: false
          })
          execSync('git push', {
            cwd: DEFAULT_WORKING_DIR,
            stdio: 'inherit'
          })
        }
      } catch (e) {
        error(e)
      }
    } else {
      console.log('This repository has no project, nothing to version.')
    }
  }
}

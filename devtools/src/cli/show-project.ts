import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { getProject, listProjects } from '../project'
import { error } from './error'

type args = {
  project?: string
  json?: boolean
}

export const showProject: CommandModule<args> = {
  command: 'show [project]',
  describe: 'Show project information',
  builder: (yargs) =>
    yargs
      .positional('project', {
        describe: 'name of the project to skaffold'
      })
      .option('json', {
        describe: 'output list in JSON format',
        type: 'boolean',
        default: false
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
    const { project, json } = { ...options, ...answers }
    try {
      const projectInfo = await getProject(project)
      const services = projectInfo.services.map(
        ({ version, name, directory, package: packageName, description }) => ({
          version,
          name,
          directory: `${directory}/${name}`,
          package: packageName,
          description
        })
      )
      if (json) {
        const { name, directory, description } = projectInfo
        console.log(
          JSON.stringify({ name, directory, description, services }, null, 2)
        )
      } else {
        console.log(
          'NAME'.padEnd(30),
          'LOCATION'.padEnd(50),
          'PACKAGE'.padEnd(50),
          'VERSION'.padEnd(10),
          'DESCRIPTION'
        )
        for (const {
          version,
          name,
          directory,
          package: packageName,
          description
        } of services) {
          console.log(
            name.padEnd(30),
            directory.padEnd(50),
            packageName.padEnd(50),
            version.padEnd(10),
            description || ''
          )
        }
      }
    } catch (e) {
      error(e)
    }
  }
}

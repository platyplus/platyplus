import { CommandModule } from 'yargs'

import { listProjects as list } from '../../project'
import { error } from '../error'

type args = {
  json?: boolean
}

export const requiredProjectList = async (): Promise<string[]> => {
  const projects = (await list()).map((p) => p.name)
  if (!projects.length)
    throw Error(
      "No project found in the repo. Please create a project first in running 'platy create project <name>'."
    )
  return projects
}

export const listProjectsCommand: CommandModule<args> = {
  command: 'projects',
  describe: 'list all available projects in the current monorepo',
  builder: (yargs) =>
    yargs.option('json', {
      describe: 'output list in JSON format',
      type: 'boolean',
      default: false
    }),
  handler: async (options) => {
    try {
      const projects = (await list()).map(
        ({ name, directory, description }) => ({
          name,
          directory,
          description
        })
      )
      if (options.json) {
        console.log(JSON.stringify(projects, null, 2))
      } else {
        console.log('NAME'.padEnd(20), 'LOCATION'.padEnd(20), 'DESCRIPTION')
        for (const project of projects) {
          console.log(
            project.name.padEnd(20),
            project.directory.padEnd(20),
            project.description
          )
        }
      }
    } catch (e) {
      error(e)
    }
  }
}

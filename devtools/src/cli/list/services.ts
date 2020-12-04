import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { PackageInformation } from '../../package/types'
import { getProject, listProjects } from '../../project'
import { getService } from '../../service'
import { error } from '../error'

type Args = {
  project?: string
  json: boolean
  all: boolean
}

export const listServices: CommandModule<Partial<Args>, Args> = {
  command: 'services [project]',
  describe: 'list all services of a given project',
  builder: (yargs) =>
    yargs
      .positional('project', {
        type: 'string',
        describe: 'name of the project to skaffold'
      })
      .option('json', {
        describe: 'output list in JSON format',
        type: 'boolean',
        default: false
      })
      .option('all', {
        describe: 'list services of all projects',
        type: 'boolean',
        default: false
      }),
  handler: async (options) => {
    const projects = await listProjects()
    if (projects.length) {
      const answers = await inquirer.prompt<Required<Args>>([
        {
          name: 'project',
          type: 'list',
          when: !options.project && !options.all,
          choices: projects.map((p) => p.name)
        }
      ])
      const { project, json, all } = { ...options, ...answers }
      const list = all ? projects : [await getProject(project)]
      try {
        const services = (
          await Promise.all(
            list
              .reduce<PackageInformation[]>(
                (prev, curr) => [...prev, ...curr.services],
                []
              )
              .map(({ package: p }) => p)
              // Remove duplicates
              .filter((index, name, array) => array.indexOf(index) == name)
              .map(getService)
          )
        ).map(
          ({
            version,
            name,
            directory,
            package: packageName,
            description,
            type
          }) => ({
            version,
            name,
            type,
            directory: `${directory}/${name}`,
            package: packageName,
            description
          })
        )
        if (json) {
          console.log(JSON.stringify(services, null, 2))
        } else {
          if (services.length) {
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
          } else {
            console.log('No service found in this project.')
          }
        }
      } catch (e) {
        error(e)
      }
    } else {
      if (options.json) {
        console.log([])
      } else {
        console.log('No project in this repository.')
      }
    }
  }
}

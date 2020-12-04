import chalk from 'chalk'
import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { getProject } from '../../project'
import { createService as create, ServiceConfig } from '../../service'
import { ServiceTypes } from '../../settings'
import { error } from '../error'
import { requiredProjectList } from '../list/projects'

type Args = {
  name?: string
  project?: string
  type?: ServiceTypes
  description?: string
  packageName?: string
  route?: boolean
}

export const createService: CommandModule<Args> = {
  command: 'service [name] [project]',
  describe: 'create a new service in a project',
  builder: (yargs) =>
    yargs
      .positional('name', {
        type: 'string',
        describe: 'service name',
        defaultDescription: 'name of the service'
      })
      .positional('project', {
        type: 'string',
        alias: 'p',
        describe: 'project name'
      })
      .option('package-name', {
        type: 'string',
        describe: 'Package name',
        defaultDescription: 'package.json name of the service'
      })
      .option('type', {
        type: 'string',
        alias: 't',
        choices: Object.values(ServiceTypes),
        describe: 'Service type'
      })
      .option('route', {
        alias: 'r',
        type: 'boolean',
        describe: 'export the service with an Ingress route'
      })
      .option('description', {
        type: 'string',
        alias: 'd',
        describe: 'description field in package.json'
      }),
  handler: async (options) => {
    try {
      const projects = await requiredProjectList()
      const answers = await inquirer.prompt<Required<Args>>([
        {
          name: 'project',
          type: 'list',
          when: !options.project,
          choices: projects
        },
        {
          name: 'type',
          type: 'list',
          when: !options.type,
          choices: Object.values(ServiceTypes)
        },
        {
          name: 'name',
          type: 'input',
          when: !options.name,
          validate: (value) => !!value || 'must not be empty'
        },
        {
          name: 'packageName',
          message: 'package.json name of the service',
          type: 'input',
          when: !options.packageName,
          default: ({ name }: { name: string }) => options.name || name,
          validate: (value) => !!value || 'must not be empty'
        },
        {
          name: 'route',
          message: 'export the service with an Ingress route',
          type: 'confirm',
          when: options.route === undefined,
          default: true
        },
        {
          name: 'description',
          type: 'input',
          when: !options.description,
          default: ({ type }: { type: string }) => `${type} service`
        }
      ])
      const {
        project: projectName,
        name,
        packageName,
        description,
        type,
        route
      } = {
        ...options,
        ...answers
      }
      const project = await getProject(projectName)
      const settings = await create(
        project,
        name,
        packageName,
        type,
        description,
        route,
        false
      )
      if (type === ServiceTypes.HasuraBackendPlus) {
        // * Connect to existing Hasura service
        const hasuraServices = project.services.filter(
          (service) => service.type === ServiceTypes.Hasura
        )
        if (hasuraServices.length) {
          console.log(chalk.green('Hasura service found in the project'))
          const hbpAnswers = await inquirer.prompt<{
            connect: boolean
            hasura: ServiceConfig
          }>([
            {
              name: 'connect',
              type: 'confirm',
              message: () =>
                hasuraServices.length === 1
                  ? `Connect to Hasura service '${hasuraServices[0].name}'?`
                  : 'Connect to one of the existing Hasura services found in the project?',
              default: true
            },
            {
              name: 'hasura',
              type: 'list',
              when: (curr) => curr.connect && hasuraServices.length > 1,
              choices: hasuraServices
            }
          ])
          if (hbpAnswers.connect) {
            settings.postServiceCreate?.(project, {
              hasura: hbpAnswers.hasura || hasuraServices[0]
            })
          }
        }
      } else {
        settings.postServiceCreate?.(project)
      }
    } catch (e) {
      error(e)
    }
  }
}

import chalk from 'chalk'
import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { getProject, listProjects, ServiceConfig } from '../../project'
import { createService as create } from '../../service'
import { ServiceTypes } from '../../settings'
import { error } from '../error'

type args = {
  name?: string
  project?: string
  type?: ServiceTypes
  description?: string
  packageName?: string
  route?: boolean
}

export const createService: CommandModule<args> = {
  command: 'service [name] [project]',
  describe: 'create a new service in a project',
  builder: (yargs) =>
    yargs
      .positional('name', {
        describe: 'service name',
        defaultDescription: 'name of the service'
      })
      .positional('project', {
        alias: 'p',
        describe: 'project name'
      })
      .option('package-name', {
        describe: 'Package name',
        defaultDescription: 'package.json name of the service'
      })
      .option('type', {
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
        alias: 'd',
        describe: 'description field in package.json'
      }),
  handler: async (options) => {
    try {
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
          message: 'package.json name of the service', // TODO duplicate of the above yargs desc
          type: 'input',
          when: !options.packageName,
          default: ({ name }: { name: string }) => options.name || name,
          validate: (value) => !!value || 'must not be empty'
        },
        {
          name: 'route',
          message: 'export the service with an Ingress route', // TODO duplicate of the above yargs desc
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

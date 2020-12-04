import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { createProject as create } from '../../project'
import { error } from '../error'

type Args = {
  name?: string
  path?: string
  description?: string
}

export const createProject: CommandModule<Args, Args> = {
  command: 'project [name] [path]',
  describe: 'create a new project',
  builder: (yargs) =>
    yargs
      .positional('name', {
        describe: 'project name',
        type: 'string'
      })
      .positional('path', {
        type: 'string',
        describe: 'path of the project from the monorepo root'
      })
      .option('description', {
        type: 'string',
        alias: 'd',
        describe: 'short description of the project'
      }),
  handler: async (options) => {
    const answers = await inquirer.prompt<Required<Args>>([
      {
        name: 'name',
        type: 'input',
        when: !options.name,
        validate: (value) => !!value || 'must not be empty'
      },
      {
        name: 'path',
        type: 'input',
        when: !options.path,
        default: ({ name }: Args) => name || options.name,
        validate: (value) => !!value || 'must not be empty'
      },
      {
        name: 'description',
        type: 'input',
        when: !options.description,
        default: ({ name }: { name: string }) => name || options.name
      }
    ])

    const { name, path, description } = { ...options, ...answers }

    try {
      await create(name, path, description)
    } catch (e) {
      error(e)
    }
  }
}

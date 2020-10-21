import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { createProject as create } from '../../project'
import { error } from '../error'

type args = {
  name?: string
  path?: string
  description?: string
}

export const createProject: CommandModule<args> = {
  command: 'project [path] [name]',
  describe: 'create a new project',
  builder: (yargs) =>
    yargs
      .positional('path', {
        describe: 'path of the project from the monorepo root'
      })
      .positional('name', {
        describe: 'project name',
        defaultDescription: "project's directory"
      })
      .option('description', {
        alias: 'd',
        describe: 'short description of the project'
      }),
  handler: async (options) => {
    const answers = await inquirer.prompt<Required<args>>([
      {
        name: 'path',
        type: 'input',
        when: !options.path,
        validate: (value) => !!value || 'must not be empty'
      },
      {
        name: 'name',
        type: 'input',
        when: !options.name,
        default: ({ path }: { path: string }) =>
          path.split('/').pop() as string,
        validate: (value) => !!value || 'must not be empty'
      },
      {
        name: 'description',
        type: 'input',
        when: !options.description,
        default: ({ name }: { name: string }) => name
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

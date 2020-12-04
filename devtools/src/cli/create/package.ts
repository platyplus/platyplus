import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { createPackage as create } from '../../package'
import { PackageTypes } from '../../settings'
import { error } from '../error'

type Args = {
  name?: string
  path?: string
  description?: string
}

export const createPackage: CommandModule<Args, Args> = {
  command: 'package [name] [path]',
  describe: 'create new TypeScript package',
  builder: (yargs) =>
    yargs
      .positional('name', {
        type: 'string',
        describe: 'name field in package.json'
      })
      .positional('path', {
        type: 'string',
        describe: 'path of the package from the monorepo root'
      })
      .option('description', {
        type: 'string',
        alias: 'd',
        describe: 'description field in package.json'
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
        default: ({ name }: { name: string }) => `${name} description`
      }
    ])
    const { name, path, description } = { ...options, ...answers }
    try {
      await create(PackageTypes.TypeScript, name, path, description)
    } catch (e) {
      error(e)
    }
  }
}

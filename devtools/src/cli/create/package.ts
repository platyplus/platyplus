import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { createPackage as create } from '../../package'
import { PackageTypes } from '../../settings'
import { error } from '../error'

type args = {
  name?: string
  path?: string
  description?: string
}

export const createPackage: CommandModule<args> = {
  command: 'package [path] [name]',
  describe: 'create new TypeScript package',
  builder: (yargs) =>
    yargs
      .positional('path', {
        describe: 'path of the package from the monorepo root'
      })
      .positional('name', {
        describe: 'name field in package.json',
        defaultDescription: "package's directory"
      })
      .option('description', {
        alias: 'd',
        describe: 'description field in package.json'
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

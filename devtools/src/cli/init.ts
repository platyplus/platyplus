import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { initMonorepo } from '../monorepo'
import { error } from './error'

type Args = {
  name?: string
  organisation?: string
  description?: string
}

export const init: CommandModule<Args, Args> = {
  command: 'init [name] [organisation]',
  describe: 'create new monorepo',
  builder: yargs =>
    yargs
      .positional('name', {
        type: 'string',
        describe: 'directory name of the monorepo'
      })
      .positional('organisation', {
        type: 'string',
        describe: 'name of the organisation (e.g. @my-org)'
      })
      .option('description', {
        type: 'string',
        alias: 'd',
        describe: 'description field in package.json'
      }),
  handler: async options => {
    const answers = await inquirer.prompt<Required<Args>>([
      {
        name: 'name',
        type: 'input',
        when: !options.name,
        validate: value => !!value || 'must not be empty'
      },
      {
        name: 'organisation',
        type: 'input',
        when: !options.organisation,
        default: ({ name }: Args) => `@${name || options.name}`,
        validate: value => !!value || 'must not be empty'
      }
    ])

    const { name, organisation, description } = { ...options, ...answers }
    try {
      await initMonorepo(name, organisation, description)
    } catch (e) {
      error(e)
    }
  }
}

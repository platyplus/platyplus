import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { initMonorepo } from '../../monorepo'
import { error } from '../error'

type args = {
  name?: string
  organisation?: string
  description?: string
}

export const createMonorepo: CommandModule<args> = {
  command: 'repo [name] [organisation]',
  describe: 'create new monorepo',
  builder: (yargs) =>
    yargs
      .positional('name', {
        describe: 'directory name of the monorepo'
      })
      .positional('organisation', {
        describe: 'name of the organisation (e.g. @my-org)',
        defaultDescription: "name of the monorepo with a '@' prefix"
      })
      .option('description', {
        alias: 'd',
        default: 'A Platy DevTools monorepo',
        describe: 'description field in package.json'
      }),
  handler: async (options) => {
    const answers = await inquirer.prompt<Required<args>>([
      {
        name: 'name',
        type: 'input',
        when: !options.name,
        validate: (value) => !!value || 'must not be empty'
      },
      {
        name: 'organisation',
        type: 'input',
        when: !options.organisation,
        validate: (value) => !!value || 'must not be empty'
      },
      {
        name: 'description',
        type: 'input',
        when: !options.description,
        default: ({ name }: { name: string }) => name
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

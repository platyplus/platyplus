import inquirer from 'inquirer'
import { CommandModule } from 'yargs'

import { createPackage } from './package'
import { createProject } from './project'
import { createService } from './service'

export const create: CommandModule = {
  command: 'create',
  describe: 'create new [project|package|service]',
  builder: (yargs) =>
    yargs
      .usage('Usage: $0 create <project|package|service>')
      .command(createPackage)
      .command(createProject)
      .command(createService),
  handler: async (yargs) => {
    const { resource } = await inquirer.prompt<{
      resource: 'project' | 'package' | 'service'
    }>([
      {
        name: 'resource',
        message: 'Select the kind of resource you whant to create:',
        type: 'list',
        choices: ['project', 'package', 'service']
      }
    ])
    if (resource === 'project') return createProject.handler(yargs)
    if (resource === 'package') return createPackage.handler(yargs)
    if (resource === 'service') return createService.handler(yargs)
  }
}

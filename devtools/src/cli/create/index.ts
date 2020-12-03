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
      .command(createService)
      .demandCommand(),
  handler: () => {
    console.log('handler')
  }
}

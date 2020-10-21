import { CommandModule } from 'yargs'

import { createMonorepo } from './monorepo'
import { createPackage } from './package'
import { createProject } from './project'
import { createService } from './service'

export const create: CommandModule = {
  command: 'create',
  describe: 'create new [repo|project|package|service]',
  builder: (yargs) =>
    yargs
      .usage('Usage: $0 create <repo|project|package>')
      .command(createMonorepo)
      .command(createPackage)
      .command(createProject)
      .command(createService)
      .demandCommand(),
  handler: () => {
    console.log('handler')
  }
}

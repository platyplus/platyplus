import { CommandModule } from 'yargs'

import { listProjectsCommand } from './projects'
import { listServices } from './services'

export const list: CommandModule = {
  command: 'list',
  describe: 'list [projects|services]',
  builder: yargs =>
    yargs
      .usage('Usage: $0 list <projects|services>')
      .command(listProjectsCommand)
      .command(listServices)
      .demandCommand(),
  handler: () => {
    // console.log('handler')
  }
}

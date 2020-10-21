import { CommandModule } from 'yargs'

import { listProjects as list } from '../project'
import { error } from './error'

type args = {
  project?: string
}

export const listProjects: CommandModule<args> = {
  command: 'list projects',
  describe: 'list all available projects in the current monorepo',
  handler: async () => {
    console.log('NAME'.padEnd(20), 'LOCATION'.padEnd(20), 'DESCRIPTION')
    try {
      for (const project of await list()) {
        console.log(
          project.name.padEnd(20),
          `./${project.directory}`.padEnd(20),
          project.description
        )
      }
    } catch (e) {
      error(e)
    }
  }
}

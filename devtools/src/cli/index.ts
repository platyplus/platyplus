#!/usr/bin/env node
import yargs from 'yargs'

import { create } from './create'
import { listProjects } from './list-projects'
import { runSkaffold } from './skaffold'
import { syncProject } from './sync-project'

yargs
  .scriptName('platy')
  .command(runSkaffold)
  .command(create)
  .command(syncProject)
  .command(listProjects)
  .showHelpOnFail(true)
  .demandCommand()
  .completion()
  .wrap(null).argv

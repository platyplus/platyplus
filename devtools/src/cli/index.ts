#!/usr/bin/env node
import yargs from 'yargs'

import { create } from './create'
import { list } from './list'
import { runSkaffold } from './skaffold'
import { syncProject } from './sync-project'

yargs
  .scriptName('platy')
  .command(runSkaffold)
  .command(create)
  .command(list)
  .command(syncProject)
  .showHelpOnFail(true)
  .demandCommand()
  .completion()
  .wrap(null).argv

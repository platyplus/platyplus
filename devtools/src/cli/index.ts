#!/usr/bin/env node
import yargs from 'yargs'

import { create } from './create'
import { init } from './init'
import { list } from './list'
import { runSkaffold } from './skaffold'
import { syncProject } from './sync-project'
import { version } from './version'

// TODO create util 'get project' working with --all as there is a duplicate pattern in the files
yargs
  .scriptName('platy')
  .command(runSkaffold)
  .command(init)
  .command(create)
  .command(list)
  .command(syncProject)
  .command(version)
  .showHelpOnFail(true)
  .demandCommand()
  .completion()
  .wrap(null).argv

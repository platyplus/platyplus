#!/usr/bin/env node
import yargs from 'yargs'

import { create } from './create'
import { dev } from './dev'
import { init } from './init'
import { list } from './list'
import { sync } from './sync'
import { version } from './version'

yargs
  .scriptName('platy')
  .command(dev)
  .command(init)
  .command(create)
  .command(list)
  .command(sync)
  .command(version)
  .showHelpOnFail(true)
  .demandCommand()
  .completion()
  .wrap(null).argv

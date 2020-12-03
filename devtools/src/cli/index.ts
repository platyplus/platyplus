#!/usr/bin/env node
import chalk from 'chalk'
import yargs from 'yargs'

import { checkMissingRequirements } from '../utils'
import { create } from './create'
import { dev } from './dev'
import { init } from './init'
import { list } from './list'
import { sync } from './sync'
import { version } from './version'

const main = async (): Promise<void> => {
  const requirements = await checkMissingRequirements()
  if (requirements.length) {
    console.log(
      chalk.red('warning'),
      'some programs need to be installed to ensure the Platy DevTools CLI to work properly:'
    )
    requirements.forEach(({ name, bin, version, optional }) => {
      let line = `${name || bin}`
      if (version) line = line.concat(` version>=${version}`)
      if (optional) line = line.concat(' (optional)')
      console.log(line)
    })
  }
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
}

main()

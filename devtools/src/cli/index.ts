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

  // TODO init (create lerna, base tsconfigs, default @org/package directory, warns when something required is not installed e.g. skaffold, helm...)
  // TODO add service <name> <project>
  // TODO post-install @platyplus/devtools: launch the script to check/warn dependencies
  // TODO -> https://www.npmjs.com/package/which
  // ? sync package <name>

  .command(syncProject)
  .command(listProjects)
  .showHelpOnFail(true)
  .demandCommand()
  .completion()
  .wrap(null).argv

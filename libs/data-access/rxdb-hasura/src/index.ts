/* eslint-disable @typescript-eslint/no-var-requires */
import { filter, first, switchMap } from 'rxjs'
import { addRxPlugin, createRxDatabase, RxDatabaseCreator } from 'rxdb'
import { RxDBAjvValidatePlugin } from 'rxdb/plugins/ajv-validate'
import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql'
import { addPouchPlugin, getRxStoragePouch } from 'rxdb/plugins/pouchdb'

import { debug } from '@platyplus/logger'

import { RxHasuraPlugin } from './rxdb-plugin'
import { Database, DatabaseCollections } from './types'
import {
  addTableInfoCollection,
  initConfigCollections,
  createContentsCollections,
  TABLE_INFO_TABLE
} from './metadata'

export { RxHasuraPlugin } from './rxdb-plugin'
export * from './contents'
export * from './types'
export * from './utils'
export * from './metadata'
export * from './state'
export * from './constants'

const persist = process.env.NODE_ENV !== 'development'

export const createRxHasura = async (
  name: string,
  url: string,
  password?: string
): Promise<Database> => {
  addRxPlugin(RxDBReplicationGraphQLPlugin)
  addRxPlugin(RxDBAjvValidatePlugin)
  addRxPlugin(RxHasuraPlugin)
  addPouchPlugin(require('rxdb/plugins/migration'))
  addRxPlugin(require('rxdb/plugins/leader-election'))
  addRxPlugin(require('rxdb/plugins/update'))
  addPouchPlugin(require('rxdb/plugins/query-builder'))

  if (process.env.NODE_ENV === 'development')
    addPouchPlugin(require('rxdb/plugins/dev-mode'))

  // * IMPORTANT: Do not use addRxPlugin to add pouchdb adapter, instead use addPouchPlugin
  if (persist) addPouchPlugin(require('pouchdb-adapter-idb'))
  else addPouchPlugin(require('pouchdb-adapter-memory'))

  const settings: RxDatabaseCreator = {
    name,
    password,
    multiInstance: false, // ! Causes errors when set to true. See notice in https://rxdb.info/leader-election.html
    eventReduce: true, // <- eventReduce (optional, default: true))
    options: {
      url
    },
    storage: getRxStoragePouch(persist ? 'idb' : 'memory')
  }

  const db = (await createRxDatabase<DatabaseCollections>(
    settings
  )) as unknown as Database

  debug('db', `reated: ${settings.name}`)
  if (process.env.NODE_ENV === 'development') window['db'] = db // write to window for debugging

  // * When being connected, browse the roles and create table info accordingly
  db.isAuthenticated$
    .pipe(filter((status) => status))
    .pipe(first())
    .pipe(switchMap(() => db.isConfigReady$))
    .subscribe(async (ready) => {
      debug('db', 'first time authenticated. Is ready?', ready)
      if (ready) addTableInfoCollection(db)
      else await initConfigCollections(db)
    })

  db.isReady$
    .pipe(filter((ready) => ready && !!db.collections[TABLE_INFO_TABLE]))
    .pipe(switchMap(() => db.collections[TABLE_INFO_TABLE].find().$))
    .subscribe((tables) => createContentsCollections(db, tables))

  // * runs when db becomes leader
  db.waitForLeadership().then(() => {
    debug('db', 'took the leadership')
  })

  return db
}

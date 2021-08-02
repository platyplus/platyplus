/* eslint-disable @typescript-eslint/no-var-requires */
import { enableMapSet } from 'immer'
import { addRxPlugin, createRxDatabase, RxDatabaseCreator } from 'rxdb'
import { RxDBAjvValidatePlugin } from 'rxdb/plugins/ajv-validate'
import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql'
import { addPouchPlugin, getRxStoragePouch } from 'rxdb/plugins/pouchdb'

import { debug } from './console'
import { initMetadataCollections } from './metadata'
import { RxHasuraPlugin } from './plugin'
import { Database, DatabaseCollections } from './types'
export { RxHasuraPlugin } from './plugin'

enableMapSet()

export * from './contents'
export * from './types'
export * from './utils'
export * from './metadata'

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

  if (process.env.NODE_ENV === 'development') {
    // IMPORTANT: Do not use addRxPlugin to add pouchdb adapter, instead use addPouchPlugin
    addPouchPlugin(require('pouchdb-adapter-memory'))
    addPouchPlugin(require('rxdb/plugins/dev-mode'))
  } else {
    addPouchPlugin(require('pouchdb-adapter-idb'))
  }

  const settings: RxDatabaseCreator = {
    name,
    password,
    multiInstance: false, // ! Causes errors when set to true. See notice in https://rxdb.info/leader-election.html
    eventReduce: true, // <- eventReduce (optional, default: true))
    options: {
      url
    },
    storage: getRxStoragePouch('memory')
  }

  const db = (await createRxDatabase<DatabaseCollections>(settings)) as Database

  // * When receiving a JWT, browse the roles and create metadata accordingly
  db.jwt$.subscribe(async (jwt) => jwt && (await initMetadataCollections(db)))

  if (process.env.NODE_ENV === 'development') {
    ;(window as unknown)['db'] = db // write to window for debugging
  }
  // * runs when db becomes leader
  db.waitForLeadership().then(() => {
    debug('DB took the leadership')
  })

  return db
}

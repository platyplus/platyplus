/* eslint-disable @typescript-eslint/no-var-requires */
import { addRxPlugin, createRxDatabase, RxDatabaseCreator } from 'rxdb'
import { RxDBAjvValidatePlugin } from 'rxdb/plugins/ajv-validate'
import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql'

import { RxHasuraPlugin } from './plugin'
import { Database, DatabaseCollections } from './types'

export { RxHasuraPlugin } from './plugin'
export * from './helpers'
export * from './types'

export const createRxHasura = async (
  name: string,
  url: string
): Promise<Database> => {
  const settings: RxDatabaseCreator = {
    name,
    // password: 'myPassword', // <- password (optional)
    multiInstance: false, // ! Causes errors when set to true. See notice in https://rxdb.info/leader-election.html
    eventReduce: true, // <- eventReduce (optional, default: true))
    options: {
      url
    },
    adapter: process.env.NODE_ENV === 'development' ? 'memory' : 'idb'
  }

  addRxPlugin(RxDBReplicationGraphQLPlugin)
  addRxPlugin(RxDBAjvValidatePlugin)
  addRxPlugin(RxHasuraPlugin)
  if (process.env.NODE_ENV === 'development') {
    addRxPlugin(require('pouchdb-adapter-memory'))
  } else {
    addRxPlugin(require('pouchdb-adapter-idb'))
  }

  const db = (await createRxDatabase<DatabaseCollections>(settings)) as Database

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any)['db'] = db // write to window for debugging
  }
  // * runs when db becomes leader
  // db.waitForLeadership().then(() => {
  //   debug('DB took the leadership')
  // })

  return db
}

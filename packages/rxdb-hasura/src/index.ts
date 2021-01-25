/* eslint-disable @typescript-eslint/no-var-requires */
import { addRxPlugin, createRxDatabase, RxDatabaseCreator } from 'rxdb'
import { RxDBAjvValidatePlugin } from 'rxdb/plugins/ajv-validate'
import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql'

import { hasuraCollections } from './database/helpers'
import { metadataSchema } from './metadata'
import { RxHasuraPlugin } from './plugin'
import { Database, DatabaseCollections } from './types'

export { RxHasuraPlugin } from './plugin'
export * from './contents'
export * from './types'
export * from './helpers'
import { hasuraClaims } from './utils'

export const createRxHasura = async (
  name: string,
  url: string,
  password?: string
): Promise<Database> => {
  const settings: RxDatabaseCreator = {
    name,
    password,
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
  addRxPlugin(require('rxdb/plugins/migration'))
  addRxPlugin(require('rxdb/plugins/leader-election'))
  addRxPlugin(require('rxdb/plugins/update'))
  addRxPlugin(require('rxdb/plugins/watch-for-changes'))
  addRxPlugin(require('rxdb/plugins/adapter-check'))
  addRxPlugin(require('rxdb/plugins/query-builder'))

  if (process.env.NODE_ENV === 'development') {
    addRxPlugin(require('pouchdb-adapter-memory'))
    addRxPlugin(require('rxdb/plugins/dev-mode'))
  } else {
    addRxPlugin(require('pouchdb-adapter-idb'))
  }

  const db = (await createRxDatabase<DatabaseCollections>(settings)) as Database

  // * When receiving a JWT, browse the roles and create metadata accordingly
  db.jwt$.subscribe(async jwt => {
    if (jwt) {
      const hasura = hasuraClaims(jwt)
      for (const role of hasura['x-hasura-allowed-roles']) {
        if (!db[`${role}_metadata`]) {
          await db.addCollections({
            [`${role}_metadata`]: {
              options: { isMetadata: true, role },
              schema: metadataSchema,
              autoMigrate: true
            }
          })
          db.contents$.next(hasuraCollections(db))
        }
      }
    }
  })

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

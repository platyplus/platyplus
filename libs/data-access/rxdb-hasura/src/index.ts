/* eslint-disable @typescript-eslint/no-var-requires */
import { enableMapSet } from 'immer'
import {
  addRxPlugin,
  createRxDatabase,
  RxDatabase,
  RxDatabaseCreator
} from 'rxdb'
import { RxDBAjvValidatePlugin } from 'rxdb/plugins/ajv-validate'
import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql'
import { addPouchPlugin, getRxStoragePouch } from 'rxdb/plugins/pouchdb'

import { debug } from './console'
import { RxHasuraPlugin } from './rxdb-plugin'
import { collectionName } from './utils'
import { contentsCollectionCreator, isManyToManyJoinTable } from './contents'
import { initCollection, MetadataStore, metadataStore } from './store'
import { onAuthChange } from './auth-state'

enableMapSet()

export { RxHasuraPlugin } from './rxdb-plugin'
export * from './contents'
export * from './types'
export * from './utils'
export * from './metadata'
export * from './store'
export * from './auth-state'
export * from './network-state'

const onReady =
  (db: RxDatabase) =>
  async ({ tables, isSyncing, isReady, replication }: MetadataStore) => {
    if (!isSyncing() && isReady()) {
      for (const table of Object.values(tables).filter(
        (table) => !isManyToManyJoinTable(table)
      )) {
        const roles: string[] = table.columns.reduce((acc, column) => {
          for (const permissionType of ['canSelect', 'canInsert']) {
            for (const { roleName } of column[permissionType]) {
              !acc.includes(roleName) && acc.push(roleName)
            }
          }
          return acc
        }, [])
        for (const role of roles) {
          const name = collectionName(table, role)
          if (!db[name] && !replication[name]) {
            initCollection(name)
            try {
              await db.addCollections({
                [name]: contentsCollectionCreator(table, role)
              })
            } catch {
              console.warn(
                `[${name}] already exists but was not found before attempting to add it`
              )
            }
          }
        }
      }
    } else {
      // TODO
      // console.log('subscription on tables: not syncing / not ready')
    }
  }

const persist = process.env.NODE_ENV !== 'development'

export const createRxHasura = async (
  name: string,
  url: string,
  password?: string
): Promise<RxDatabase> => {
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

  const db = await createRxDatabase(settings)
  debug(`RxDB created: ${settings.name}`)
  if (process.env.NODE_ENV === 'development') window['db'] = db // write to window for debugging

  // * When being connected, browse the roles and create metadata accordingly
  metadataStore.subscribe(onAuthChange(db), (state) => state.authenticated)
  metadataStore.subscribe(onReady(db))

  // * runs when db becomes leader
  db.waitForLeadership().then(() => {
    debug('DB took the leadership')
  })

  return db
}

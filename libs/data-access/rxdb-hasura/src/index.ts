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
import { initConfigCollections, metadataSchema } from './metadata'
import { RxHasuraPlugin } from './plugin'
import { collectionName } from './utils'
import { contentsCollectionCreator, isManyToManyJoinTable } from './contents'
import { initCollection, metadataStore } from './store'

enableMapSet()

export { RxHasuraPlugin } from './plugin'
export * from './contents'
export * from './types'
export * from './utils'
export * from './metadata'
export * from './store'

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

  const db = await createRxDatabase(settings)

  // * When receiving a JWT, browse the roles and create metadata accordingly
  metadataStore.subscribe(
    async (connected) => {
      if (connected) {
        await initConfigCollections(db)
        if (metadataStore.getState().isConfigReady()) {
          await db.addCollections({
            metadata: {
              options: { isMetadata: true },
              schema: metadataSchema,
              autoMigrate: true
            }
          })
        } else
          metadataStore.subscribe(
            async (ready: boolean) => {
              if (ready) {
                await db.addCollections({
                  metadata: {
                    options: { isMetadata: true },
                    schema: metadataSchema,
                    autoMigrate: true
                  }
                })
              }
            },
            (state) => state.isConfigReady()
          )
      }
    },
    (state) => state.connected
  )

  metadataStore.subscribe(
    async ({ tables, isSyncing, isReady, replication }) => {
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
  )

  if (process.env.NODE_ENV === 'development') {
    ;(window as unknown)['db'] = db // write to window for debugging
  }
  // * runs when db becomes leader
  db.waitForLeadership().then(() => {
    debug('DB took the leadership')
  })

  return db
}

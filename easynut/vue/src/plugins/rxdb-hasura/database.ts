/* eslint-disable @typescript-eslint/no-var-requires */
import {
  addRxPlugin,
  createRxDatabase,
  RxDatabase,
  RxDatabaseCreator
} from 'rxdb'
import { RxDBAjvValidatePlugin } from 'rxdb/plugins/ajv-validate'
import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql'
import { RxDBValidatePlugin } from 'rxdb/plugins/validate'

import { TableFragment } from '../../generated'
import { Optional } from '../../utils/helpers'
import { toJsonSchema } from './json-schema'

addRxPlugin(RxDBReplicationGraphQLPlugin)
addRxPlugin(RxDBValidatePlugin)
addRxPlugin(RxDBAjvValidatePlugin)

export type RxHasuraDatabase = RxDatabase & {
  addTables(tables: TableFragment[]): Promise<void>
}

const addTables = async (db: RxDatabase, tables: TableFragment[]) => {
  for (const table of tables) {
    const schema = toJsonSchema(table)
    await db.addCollections({
      [`${schema.title}`]: {
        schema,
        pouchSettings: {}, // (optional)
        statics: {}, // (optional) ORM-functions for this collection
        methods: {}, // (optional) ORM-functions for documents
        attachments: {}, // (optional) ORM-functions for attachments
        options: {}, // (optional) Custom parameters that might be used in plugins
        migrationStrategies: {}, // (optional)
        autoMigrate: true, // (optional)
        cacheReplacementPolicy: function () {
          console.log('cacheReplacementPolicy')
        } // (optional) custom cache replacement policy
      }
    })
  }
  console.log(`DatabaseService: initialised ${tables.length} collections`)
}

export const createDb = async (
  settings: Optional<RxDatabaseCreator, 'adapter'>
): Promise<RxHasuraDatabase> => {
  console.log('DatabaseService: creating database..')
  if (process.env.NODE_ENV === 'development') {
    addRxPlugin(require('pouchdb-adapter-memory'))
    settings.adapter = 'memory'
  } else {
    addRxPlugin(require('pouchdb-adapter-idb'))
    settings.adapter = 'idb'
  }

  const db = (await createRxDatabase(
    settings as RxDatabaseCreator
  )) as RxHasuraDatabase
  console.log('DatabaseService: created database')
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any)['db'] = db // write to window for debugging
  }
  db.addTables = tables => addTables(db, tables)
  return db
}

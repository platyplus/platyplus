/* eslint-disable @typescript-eslint/no-var-requires */
import {
  addRxPlugin,
  createRxDatabase,
  RxDatabase,
  RxDatabaseCreator
} from 'rxdb'
import { RxCollectionCreatorBase } from 'rxdb/dist/types/types'
import { RxDBAjvValidatePlugin } from 'rxdb/plugins/ajv-validate'
import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql'

import { TableFragment } from '../../generated'
import { Optional } from '../../utils/helpers'
import { debug, info } from './helpers'
import { toJsonSchema } from './json-schema'

addRxPlugin(RxDBReplicationGraphQLPlugin)
addRxPlugin(RxDBAjvValidatePlugin)

export type RxHasuraDatabase = RxDatabase & {
  addTables(tables: TableFragment[]): Promise<void>
}

const addTables = async (db: RxDatabase, tables: TableFragment[]) => {
  const collectionDefinitions = tables.reduce<
    Record<string, RxCollectionCreatorBase>
  >((definitions, table) => {
    const schema = toJsonSchema(table)
    definitions[`${schema.title}`] = {
      schema,
      pouchSettings: {}, // (optional)
      statics: {}, // (optional) ORM-functions for this collection
      methods: {}, // (optional) ORM-functions for documents
      attachments: {}, // (optional) ORM-functions for attachments
      options: {}, // (optional) Custom parameters that might be used in plugins
      migrationStrategies: {}, // (optional)
      autoMigrate: true, // (optional)
      cacheReplacementPolicy: function () {
        debug('cacheReplacementPolicy')
      } // (optional) custom cache replacement policy
    }
    return definitions
  }, {})
  await db.addCollections(collectionDefinitions)
  info(`DatabaseService: initialised ${tables.length} collections`)
}

export const createDb = async (
  settings: Optional<RxDatabaseCreator, 'adapter'>
): Promise<RxHasuraDatabase> => {
  debug('DatabaseService: creating database..')
  if (process.env.NODE_ENV === 'development') {
    addRxPlugin(require('pouchdb-adapter-memory'))
    settings.adapter = 'memory'
  } else {
    addRxPlugin(require('pouchdb-adapter-idb'))
    settings.adapter = 'idb'
  }

  // ! Causes errors when set to true. See notice in https://rxdb.info/leader-election.html
  settings.multiInstance = false
  const db = (await createRxDatabase(
    settings as RxDatabaseCreator
  )) as RxHasuraDatabase
  info('DatabaseService: created database')
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any)['db'] = db // write to window for debugging
  }
  db.addTables = tables => addTables(db, tables)
  return db
}

import { RxDatabase } from 'rxdb'

import { info, warn } from '../console'
import {
  contentsCollectionCreator,
  equivalentSchemas,
  isManyToManyJoinTable,
  toJsonSchema
} from '../contents'
import { ContentsCollection } from '../types'
import { collectionName, removeCollection, tableRoles } from '../utils'

import { initCollection, TableInfoStore, setCollectionIsReady } from './store'

export const watchTableInfoChanges =
  (db: RxDatabase) =>
  async (
    { tables, isSyncing, isReady, replication }: TableInfoStore,
    { tables: oldTables }: TableInfoStore
  ) => {
    if (!isSyncing() && isReady()) {
      // * Check if some tables have been removed. If so, remove RxDB collections as well
      const deletedTables = Object.values(oldTables).filter(
        ({ id }) => !tables[id]
      )
      for (const table of deletedTables) {
        for (const role of tableRoles(table)) {
          const name = collectionName(table, role)
          const collection = db.collections[name] as ContentsCollection
          if (collection) await removeCollection(collection)
        }
      }

      for (const table of Object.values(tables).filter(
        (table) => !isManyToManyJoinTable(table)
      )) {
        for (const role of tableRoles(table)) {
          const name = collectionName(table, role)
          if (!db[name]) {
            if (!replication[name]) {
              initCollection(name)
              try {
                await db.addCollections({
                  [name]: contentsCollectionCreator(table, role)
                })
                setCollectionIsReady(name)
              } catch {
                warn(
                  `[${name}] already exists but was not found before attempting to add it`
                )
              }
            }
          } else if (db[name].options.tableId) {
            const collection = db[name] as ContentsCollection
            const previousSchema = collection.schema.jsonSchema
            const newSchema = toJsonSchema(table, role)

            if (!equivalentSchemas(previousSchema, newSchema)) {
              info(`[${name}] new schema. Reload the entire collection`)
              // TODO ideally, identify the column/relationship changes and delete the removed one, and go fetch the missing ones through graphql
              try {
                await removeCollection(collection)
                await db.addCollections({
                  [name]: contentsCollectionCreator(table, role)
                })
                setCollectionIsReady(name)
              } catch (e) {
                warn(`[${name}] impossible to update collection`, e)
              }
            }
          } else {
            warn(`[${name}] Cannot modify a non-contents collection`)
          }
        }
      }
    }
  }

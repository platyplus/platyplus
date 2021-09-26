import { RxDocument } from 'rxdb'
import { collectionName, removeCollection, info, warn } from '../utils'
import {
  contentsCollectionCreator,
  equivalentSchemas,
  isManyToManyJoinTable,
  toJsonSchema
} from '../contents'
import { ContentsCollection, Database } from '../types'
import { TableInformation } from './types'
import { tableRoles } from './utils'

export const createContentsCollections = async (
  db: Database,
  tables: RxDocument<TableInformation>[]
) => {
  for (const table of Object.values(tables).filter(
    (table) => !isManyToManyJoinTable(table)
  )) {
    for (const role of tableRoles(table)) {
      const name = collectionName(table, role)
      if (!db[name]) {
        try {
          await db.addCollections({
            [name]: contentsCollectionCreator(table, role)
          })
        } catch (error) {
          warn(`[${name}] Error creating the collection`, error)
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
          } catch (e) {
            warn(`[${name}] impossible to update collection`, e)
          }
        }
      } else {
        warn(`[${name}] Cannot modify a non-contents collection`)
      }
    }
  }
  // }
}

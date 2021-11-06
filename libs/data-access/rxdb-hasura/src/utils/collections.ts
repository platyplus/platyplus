import { RxCollectionCreator } from 'rxdb'

import { warn, debug } from '@platyplus/logger'

import { Database, ContentsCollection } from '../types'
import { TableInformation, tableName } from '../metadata'

export const collectionName = (tableInfo: TableInformation, role: string) =>
  `${role}_${tableName(tableInfo)}`

export const createCollection = async (
  db: Database,
  name: string,
  options: RxCollectionCreator
) => {
  try {
    await db.addCollections({
      [name]: options
    })
  } catch (error) {
    warn(`[${name}] error creating the collection`, error)
  }
}

export const removeCollection = async (collection: ContentsCollection) => {
  debug(`[${collection.name}] remove collection`)
  await collection.replicator.destroy()
  await collection.database.removeCollectionDoc(
    collection.name,
    collection.schema.jsonSchema
  )
  await collection.destroy()
}

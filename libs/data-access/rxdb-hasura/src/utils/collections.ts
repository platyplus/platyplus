import { RxCollectionCreator } from 'rxdb'

import { Database, ContentsCollection } from '../types'
import { TableInformation, tableName } from '../metadata'

import { debug, warn } from './console'

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
    warn(`[${name}] error creating the collection`, error.name)
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

import { isRxDocument, RxDocument } from 'rxdb'
import { DeepReadonly } from 'rxdb/dist/types/types'
import clone from 'clone-deep'

import { Contents, ContentsCollection, ContentsDocument } from '../types'
import { debug } from './console'
import { TableInformation, tableName } from '../metadata'

export * from './console'
export * from './graphql'
export * from './hasura'
export * from './jsonata'
export * from './replicator'
export * from './types'

export const collectionName = (tableInfo: TableInformation, role: string) =>
  `${role}_${tableName(tableInfo)}`

export const documentContents = <T>(doc: T | RxDocument<T>): DeepReadonly<T> =>
  isRxDocument(doc) ? (doc as RxDocument<T>).toJSON() : (doc as DeepReadonly<T>)

export const populateDocument = async (
  doc: ContentsDocument
): Promise<Contents> => {
  const result = clone(doc)
  for (const field of doc.collection.schema.topLevelFields) {
    if (doc.collection.schema.jsonSchema.properties[field].ref) {
      const population = await doc.populate(field)
      result[field] =
        population &&
        (Array.isArray(population)
          ? population.map((item) => item.toJSON())
          : population.toJSON())
    }
  }
  return result
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

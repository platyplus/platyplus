import { RxDatabase } from 'rxdb'
import {
  getDocumentMetadata,
  getMetadataTable,
  metadataStore
} from '../../../metadata'
import { Contents, ContentsCollection, ContentsDocument } from '../../../types'
import { collectionName } from '../../../utils'
import { isManyToManyJoinTable } from '../utils'
/**
 * Events on forein keys:
 * a = no action
 * r = restrict
 * c = cascade
 * n = set null
 * d = set default
 */
export const createForeignKeyConstraintsHooks = (
  collection: ContentsCollection
): void => {
  collection.preRemove(async (data: Contents, document: ContentsDocument) => {
    const metadata = getDocumentMetadata(document)
    for (const fk of metadata.dependentForeignKeys) {
      const remoteMetadata = getMetadataTable(fk.tableId)
      if (isManyToManyJoinTable(remoteMetadata)) return // * No possible changes on join many to many tables
      // TODO remoteMetadata is null when fk aims at a join m2m table
      if (remoteMetadata) {
        const remoteCollection: ContentsCollection =
          collection.database.collections[
            collectionName(remoteMetadata, collection.role)
          ]
        const remoteProperty = remoteMetadata.relationships.find((rel) =>
          rel.mapping.some((mapping) =>
            fk.columns.includes(mapping.column.name)
          )
        )
        if (fk.onDelete === 'c') {
          console.log(`cascade delete ${fk.tableId}.${remoteProperty.name}`)
          await remoteCollection
            .find()
            .where(remoteProperty.name)
            .equals(data.id)
            .remove()
        }
        // TODO restrict, null, default, no action
      }
    }
  }, true)
}

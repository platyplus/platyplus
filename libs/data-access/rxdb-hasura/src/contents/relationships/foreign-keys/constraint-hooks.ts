import { getDocumentTableInfo, getTableInfo } from '../../../metadata'
import { Contents, ContentsCollection, ContentsDocument } from '../../../types'
import { collectionName } from '../../../utils'
import {
  allRelationships,
  isManyToManyJoinTable,
  relationshipMapping
} from '../utils'
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
    const tableInfo = getDocumentTableInfo(document)
    for (const fk of tableInfo.dependentForeignKeys) {
      const remoteInfo = getTableInfo(fk.from)
      if (isManyToManyJoinTable(remoteInfo)) return // * No possible changes on join many to many tables
      // TODO remote table info is null when fk aims at a join m2m table
      if (remoteInfo) {
        const remoteCollection: ContentsCollection =
          collection.database.collections[
            collectionName(remoteInfo, collection.options.role)
          ]

        const remoteProperty = allRelationships(remoteInfo).find((rel) => {
          const mapping = relationshipMapping(remoteInfo, rel)
          return Object.keys(mapping).some((col) => !!fk.mapping[col])
        })
        // ! TODO onDelete
        /*
        if (fk.onDelete === 'c') {
          debug(`cascade delete ${fk.tableId}.${remoteProperty.name}`)
          await remoteCollection
            .find()
            .where(remoteProperty.name)
            .equals(data.id)
            .remove()
        }*/
        // TODO restrict, null, default, no action
      }
    }
  }, true)
}

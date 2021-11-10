import { getCollectionTableInfo, getTableInfo } from '../../../metadata'
import { ForeignKey } from '../../../metadata/table-information/types'
import { ContentsCollection, ContentsDocument, TableInfo } from '../../../types'
import { collectionName } from '../../../utils'

import {
  allRelationships,
  isManyToManyJoinTable,
  relationshipMapping
} from '../utils'

export const foreignDocumentDependencies = (document: ContentsDocument) => {
  const collection = document.collection as ContentsCollection
  const table = getCollectionTableInfo(collection)
  const remoteCollection = collection.database.collections[
    collectionName(table, collection.options.role)
  ] as ContentsCollection
  return table.dependentForeignKeys
    .map<[Omit<ForeignKey, 'to'>, TableInfo]>((fk) => [
      fk,
      getTableInfo(fk.from)
    ])
    .filter(
      ([, remoteInfo]) => remoteInfo && !isManyToManyJoinTable(remoteInfo)
    )
    .map(([key, table]) => {
      const remoteProperty = allRelationships(table).find((rel) => {
        const mapping = relationshipMapping(table, rel)
        return Object.keys(mapping).some((col) => !!key.mapping[col])
      })
      return {
        key,
        table,
        property: remoteProperty,
        query: remoteCollection
          .find()
          .where(remoteProperty.name) // TODO composite key
          .equals(document.id)
      }
    })
}

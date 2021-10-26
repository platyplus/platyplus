import { debug, info, warn } from '@platyplus/logger'
import { getDocumentTableInfo, getTableInfo } from '../../../metadata'
import { ForeignKey } from '../../../metadata/table-information/types'
import { Contents, ContentsCollection, ContentsDocument } from '../../../types'
import { collectionName } from '../../../utils'
import {
  allRelationships,
  isManyToManyJoinTable,
  relationshipMapping
} from '../utils'

export const createForeignKeyConstraintsHooks = (
  collection: ContentsCollection
): void => {
  collection.preRemove(async (data: Contents, document: ContentsDocument) => {
    info(`[${collection.name}] createForeignKeyConstraintsHooks preRemove`)
    const tableInfo = getDocumentTableInfo(document)
    for (const fk of tableInfo.dependentForeignKeys) {
      const remoteInfo = getTableInfo(fk.from)
      if (isManyToManyJoinTable(remoteInfo)) return // ? No possible changes on join many to many tables?
      // TODO remote table info is null when fk aims at a join m2m table
      if (remoteInfo) {
        const remoteCollection =
          collection.database.collections[
            collectionName(remoteInfo, collection.options.role)
          ]

        const remoteProperty = allRelationships(remoteInfo).find((rel) => {
          const mapping = relationshipMapping(remoteInfo, rel)
          return Object.keys(mapping).some((col) => !!fk.mapping[col])
        })

        const actions: Record<
          ForeignKey['delete_rule'],
          () => Promise<void> | void
        > = {
          CASCADE: async () => {
            debug(
              `[${collection.name}] cascade delete ${fk.from}.${remoteProperty.name}`
            )
            await remoteCollection
              .find()
              .where(remoteProperty.name) // TODO composite key
              .equals(data.id)
              .remove()
          },
          'NO ACTION': () => {
            warn('TODO')
          },
          RESTRICT: () => {
            warn('TODO')
          },
          'SET DEFAULT': () => {
            warn('TODO')
          },
          'SET NULL': () => {
            warn('TODO')
          }
        }
        actions[fk.delete_rule]()
      }
    }
  }, true)
}

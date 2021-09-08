import { RxCollectionHookCallback } from 'rxdb'

import { arrayChanges } from '@platyplus/data'

import {
  Contents,
  ContentsCollection,
  ContentsDocumentMethods
} from '../../types'
import { debug, warn, collectionName } from '../../utils'
import { getCollectionTableInfo } from '../../metadata'

import { allRelationships, relationshipTableId, shiftedTable } from './utils'

const reverseRelations =
  (
    collection: ContentsCollection,
    insert = false
  ): RxCollectionHookCallback<Contents, ContentsDocumentMethods> =>
  async (data, doc) => {
    // * Stop recursive spreading of changes done locally
    if (data.is_local_change) return
    const tableInfo = getCollectionTableInfo(collection)
    for (const relationship of allRelationships(tableInfo)) {
      const { name, type } = relationship
      const remoteInfo = shiftedTable(tableInfo, relationship)
      // * Pass relationships that don't point to any known tableInfo table
      if (!remoteInfo) return

      const remoteCollection =
        collection.database.collections[
          collectionName(remoteInfo, collection.options.role)
        ]
      const mirrorRelationships = allRelationships(remoteInfo).filter(
        (rel) => relationshipTableId(remoteInfo, rel) === tableInfo.id
      )

      if (mirrorRelationships.length > 1) {
        // ? sort this out - is it really a problem? Test without it
        warn(
          `Relation ${collection.name}.${name} points to ${remoteInfo.id}, but ${remoteInfo.id} have more than one relation that points back to ${collection.name}. Can't determine which to process`
        )
        return
      }

      // * Get the previous values of the document
      const oldRelId =
        !insert && (await collection.findOne(data.id).exec())?.[name]
      const newRelId = data[name]

      for (const {
        name: mirrorRelName,
        type: mirrorRelType
      } of mirrorRelationships) {
        debug(
          `${collection.name}.${name} (${type}) -> ${remoteInfo.id}.${mirrorRelName} (${mirrorRelType})`
        )
        if (type === 'array') {
          // * From one/many to many
          const { add, remove } = arrayChanges<string>(
            oldRelId || [],
            newRelId || [],
            (a, b) => a === b
          )

          const addDocs = await remoteCollection.findByIds(add)
          for (const remoteDoc of addDocs.values()) {
            if (mirrorRelType === 'array') {
              // * From many to many
              remoteDoc.atomicPatch({
                is_local_change: true,
                [mirrorRelName]: [...remoteDoc[name], doc.id]
              })
            } else {
              // * From one to many
              remoteDoc.atomicPatch({
                is_local_change: false,
                [mirrorRelName]: remoteDoc[name]
              })
            }
          }
          const removeDocs = remove.length
            ? await remoteCollection.findByIds(remove)
            : []
          for (const remoteDoc of removeDocs.values()) {
            if (mirrorRelType === 'array') {
              remoteDoc.atomicPatch({
                is_local_change: true,
                [mirrorRelName]: remoteDoc[name].filter(
                  (key: string) => key !== doc.id
                )
              })
            } else {
              remoteDoc.atomicPatch({
                is_local_change: false,
                [mirrorRelName]: null
              })
            }
          }
        } else {
          if (mirrorRelType === 'array') {
            // * From one to many
            if (oldRelId !== newRelId) {
              if (oldRelId) {
                const oldRemoteDocument = await remoteCollection
                  .findOne(oldRelId)
                  .exec()
                const updatedMirrorValues = oldRemoteDocument[
                  mirrorRelName
                ].filter((key: string) => key !== data.id)
                await oldRemoteDocument.atomicPatch({
                  is_local_change: true,
                  [mirrorRelName]: updatedMirrorValues
                })
              }
              if (newRelId) {
                const newRemoteDocument = await remoteCollection
                  .findOne(newRelId)
                  .exec()
                const updatedMirrorValues = [
                  ...newRemoteDocument[mirrorRelName],
                  data.id
                ]
                await newRemoteDocument.atomicPatch({
                  is_local_change: true,
                  [mirrorRelName]: updatedMirrorValues
                })
              }
            }
          } else {
            // TODO From one to one
            warn(
              `${tableInfo.id}.${name}: link-reverse one to one relationship is not set yet`
            )
          }
        }
      }
    }
  }

export const createReverseRelationshipHooks = (
  collection: ContentsCollection
): void => {
  collection.preSave(reverseRelations(collection), false)
  collection.postInsert(reverseRelations(collection, true), false)
}

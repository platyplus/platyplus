import { RxCollectionHookCallback } from 'rxdb'

import { arrayChanges } from '@platyplus/data'
import { warn, debug } from '@platyplus/logger'
import {
  Contents,
  ContentsCollection,
  ContentsDocumentMethods
} from '../../types'
import { collectionName } from '../../utils'
import { getCollectionTableInfo } from '../../metadata'

import { allRelationships, getMirrorRelationship } from './utils'

const reverseRelations =
  (
    collection: ContentsCollection,
    insert = false
  ): RxCollectionHookCallback<Contents, ContentsDocumentMethods> =>
  async (data, doc) => {
    // * Stop recursive spreading of changes done locally
    if (data.is_local_change) {
      return
    }
    const tableInfo = getCollectionTableInfo(collection)
    for (const relationship of allRelationships(tableInfo)) {
      const { name, type } = relationship
      const [mirrorTable, mirrorRelationship] = getMirrorRelationship(
        tableInfo,
        relationship
      )

      // * Pass relationships that don't point to any known tableInfo table
      if (!mirrorRelationship) return

      const remoteCollection =
        collection.database.collections[
          collectionName(mirrorTable, collection.options.role)
        ]
      // * Get the previous values of the document
      const oldRelId =
        !insert && (await collection.findOne(data.id).exec())?.[name]
      const newRelId = data[name]
      const { name: mirrorRelName, type: mirrorRelType } = mirrorRelationship

      debug(
        `${collection.name}.${name} (${type}) -> ${mirrorTable.id}.${mirrorRelName} (${mirrorRelType})`
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
          // * Add new keys
          if (mirrorRelType === 'array') {
            // * From many to many
            await remoteDoc.atomicPatch({
              is_local_change: true,
              [mirrorRelName]: [...remoteDoc[name], doc.id]
            })
          } else {
            // * From one to many
            await remoteDoc.atomicPatch({
              is_local_change: false,
              [mirrorRelName]: remoteDoc[name]
            })
          }
        }
        const removeDocs = remove.length
          ? await remoteCollection.findByIds(remove)
          : []
        for (const remoteDoc of removeDocs.values()) {
          // * Remove removed keys
          if (mirrorRelType === 'array') {
            // * From many to many
            await remoteDoc.atomicPatch({
              is_local_change: true,
              [mirrorRelName]: remoteDoc[name].filter(
                (key: string) => key !== doc.id
              )
            })
          } else {
            // * From one to many
            await remoteDoc.atomicPatch({
              is_local_change: false,
              [mirrorRelName]: null
            })
          }
        }
      } else {
        // * From one to one/many
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

export const createReverseRelationshipHooks = (
  collection: ContentsCollection
): void => {
  collection.preSave(reverseRelations(collection), false)
  collection.postInsert(reverseRelations(collection, true), false)
}

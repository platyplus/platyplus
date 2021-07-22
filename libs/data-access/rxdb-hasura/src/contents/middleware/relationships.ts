import { arrayChanges } from '@platyplus/data'
import { RxCollectionHookCallback } from 'rxdb'
import { debug, warn } from '../../console'

import {
  Contents,
  ContentsCollection,
  ContentsDocumentMethods
} from '../../types'

const preSaveRelationship =
  (
    collection: ContentsCollection
  ): RxCollectionHookCallback<Contents, ContentsDocumentMethods> =>
  async (data, doc) => {
    // * Stop recursive spreading of changes done locally
    if (data.is_local_change) return
    for (const { rel_name: relName, rel_type: relType } of collection.metadata
      .relationships) {
      const property = collection.properties.get(relName)
      const remoteCollection: ContentsCollection =
        collection.database.collections[property.ref]
      const mirrorRelationships =
        remoteCollection.metadata.relationships.filter(
          (rel) => rel.remoteTable.id === collection.metadata.id
        )

      if (mirrorRelationships.length > 1) {
        // TODO sort this out - is it really a problem? Test without it
        warn(
          `Relation ${collection.name}.${relName} points to ${remoteCollection.name}, but ${remoteCollection.name} have more than one relation that points back to ${collection.name}. Can't determine which to process`
        )
      }

      // * Get the previous values of the document
      const oldDocument = await collection.findOne(data.id).exec()
      const oldRelId = oldDocument && oldDocument[relName]
      const newRelId = data[relName]

      for (const {
        rel_name: mirrorRelName,
        rel_type: mirrorRelType
      } of mirrorRelationships) {
        debug(
          `${collection.name}.${relName} <-> ${remoteCollection.name}.${mirrorRelName}`
        )
        if (relType === 'array') {
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
                [mirrorRelName]: [...remoteDoc[relName], doc.id]
              })
            } else {
              // * From one to many
              remoteDoc.atomicPatch({
                is_local_change: false,
                [mirrorRelName]: remoteDoc[relName]
              })
            }
          }
          const removeDocs = await remoteCollection.findByIds(remove)
          for (const remoteDoc of removeDocs.values()) {
            if (mirrorRelType === 'array') {
              remoteDoc.atomicPatch({
                is_local_change: true,
                [mirrorRelName]: remoteDoc[relName].filter(
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
            warn('One to One relationship is not set yet')
          }
        }
      }
    }
  }

export const createRelationshipHooks = (
  collection: ContentsCollection
): void => {
  collection.preSave(preSaveRelationship(collection), false)
}

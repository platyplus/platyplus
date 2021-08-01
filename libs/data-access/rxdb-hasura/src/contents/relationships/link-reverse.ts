import { arrayChanges } from '@platyplus/data'
import { RxCollectionHookCallback } from 'rxdb'
import { debug, warn } from '../../console'
import { getCollectionMetadata, getMetadataTable } from '../../metadata'

import {
  Contents,
  ContentsCollection,
  ContentsDocumentMethods
} from '../../types'
import { collectionName } from '../../utils'
import { metadataProperties } from '../properties'

const reverseRelations =
  (
    collection: ContentsCollection,
    insert = false
  ): RxCollectionHookCallback<Contents, ContentsDocumentMethods> =>
  async (data, doc) => {
    // * Stop recursive spreading of changes done locally
    if (data.is_local_change) return
    const metadata = getCollectionMetadata(collection)
    const relationships = [...metadataProperties(metadata).entries()].filter(
      ([, prop]) => prop.relationship
    )
    for (const [name, { type, relationship }] of relationships) {
      const remoteMetadata = getMetadataTable(relationship.ref)
      const remoteCollectionName = collectionName(
        remoteMetadata,
        collection.role
      )
      const remoteCollection =
        collection.database.collections[remoteCollectionName]
      const mirrorRelationships = remoteMetadata.relationships.filter(
        (rel) => rel.remoteTable.id === metadata.id
      )

      if (mirrorRelationships.length > 1) {
        // TODO sort this out - is it really a problem? Test without it
        warn(
          `Relation ${collection.name}.${name} points to ${remoteCollection.name}, but ${remoteCollection.name} have more than one relation that points back to ${collection.name}. Can't determine which to process`
        )
      }

      // * Get the previous values of the document
      const oldRelId =
        !insert && (await collection.findOne(data.id).exec()?.[name])
      const newRelId = data[name]

      for (const {
        name: mirrorRelName,
        type: mirrorRelType
      } of mirrorRelationships) {
        debug(
          `${collection.name}.${name} <-> ${remoteCollection.name}.${mirrorRelName}`
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
            warn('One to One relationship is not set yet')
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

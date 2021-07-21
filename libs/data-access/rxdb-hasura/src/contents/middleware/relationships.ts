import { RxCollectionHookCallback } from 'rxdb'

import {
  Contents,
  ContentsCollection,
  ContentsDocumentMethods
} from '../../types'

// ! locks documents when being saved to avoid infitite loop when changing a relationship or its mirror
const documentLocks: Record<string, boolean> = {}

// TODO revoir completement le système
const postInsertRelationship =
  (
    collection: ContentsCollection
  ): RxCollectionHookCallback<Contents, ContentsDocumentMethods> =>
  async (data, doc) => {
    // TODO use 'populate' to simplify
    for (const rel of collection.metadata.relationships) {
      const relName = rel.rel_name
      if (!data[relName]) return // * Relation stayed null
      const property = collection.schema.jsonSchema.properties[relName]
      const refCollection: ContentsCollection =
        collection.database.collections[property.ref]
      const mirrorRelation = Object.entries(
        refCollection.schema.jsonSchema.properties
      ).find(([, value]) => {
        return value.ref === collection.name
      })?.[0]
      if (!mirrorRelation) return
      if (rel.rel_type === 'array') {
        // * When a One-to-Many (array) relationship changes, update the potential mirror Many-to-One (object) relationship in the referenced collection
        const additions: string[] = data[relName] || []
        // * Changes foreign key in the new referenced documents
        for (const addition of additions) {
          const refDoc = await refCollection.findOne(addition).exec()
          if (refDoc && !documentLocks[refDoc.primary])
            await refDoc.atomicPatch({
              [mirrorRelation]: doc.primary
            })
        }
      } else if (rel.rel_type === 'object') {
        // * When a Many-to-One (object) relationship changes, update the potential mirror One-To-Many (array) relationship in the referenced collection
        const newValue: string = data[relName]
        // * Add document from the One-to-Many relationship in the new Many-To-One reference
        const refDoc = await refCollection.findOne(newValue).exec()
        if (refDoc && !documentLocks[refDoc.primary])
          await refDoc.atomicPatch({
            [mirrorRelation]: [...refDoc.get(mirrorRelation), doc.primary]
          })
      }
    }
  }

const preSaveRelationship =
  (
    collection: ContentsCollection
  ): RxCollectionHookCallback<Contents, ContentsDocumentMethods> =>
  async (data, doc) => {
    // TODO use 'populate' to simplify
    documentLocks[doc.primary] = true
    for (const rel of collection.metadata.relationships) {
      const relName = rel.rel_name
      if (!doc[relName] && !data[relName]) return // * Relation stayed null
      const property = collection.properties.get(relName)
      const refCollection: ContentsCollection =
        collection.database.collections[property.ref]
      const mirrorRelation = Object.entries(
        refCollection.schema.jsonSchema.properties
      ).find(([, value]) => {
        return value.ref === collection.name
      })?.[0]
      if (!mirrorRelation) return
      if (rel.rel_type === 'array') {
        // * When a One-to-Many (array) relationship changes, update the potential mirror Many-to-One (object) relationship in the referenced collection
        const oldValue: string[] = doc[relName] || []
        const newValue: string[] = data[relName] || []
        // * Changes foreign key in the new referenced documents
        const additions = newValue.filter((value) => !oldValue.includes(value))
        for (const addition of additions) {
          const refDoc = await refCollection.findOne(addition).exec()
          if (refDoc && !documentLocks[refDoc.primary])
            await refDoc.atomicPatch({
              [mirrorRelation]: doc.primary
            })
        }
        // * Set foreign key to null in the unreferenced documents
        // TODO if cascade, remove the document
        const deletions = oldValue.filter((value) => !newValue.includes(value))
        for (const deletion of deletions) {
          const refDoc = await refCollection.findOne(deletion).exec()
          if (refDoc && !documentLocks[refDoc.primary])
            await refDoc.atomicPatch({
              [mirrorRelation]: null
            })
        }
      } else if (rel.rel_type === 'object') {
        // * When a Many-to-One (object) relationship changes, update the potential mirror One-To-Many (array) relationship in the referenced collection
        const oldValue = doc[relName]
        const newValue = data[relName]
        if (newValue !== oldValue) {
          if (oldValue) {
            // * Remove document from the One-to-Many relationship in the old Many-To-One reference
            const refDoc = await refCollection.findOne(oldValue).exec()
            if (refDoc && !documentLocks[refDoc.primary])
              await refDoc.atomicPatch({
                [mirrorRelation]: refDoc
                  .get(mirrorRelation)
                  .filter((key: string) => key !== doc.primary)
              })
          }
          if (newValue) {
            // * Add document from the One-to-Many relationship in the new Many-To-One reference
            const refDoc = await refCollection.findOne(newValue).exec()
            if (refDoc && !documentLocks[refDoc.primary])
              await refDoc.atomicPatch({
                [mirrorRelation]: [...refDoc.get(mirrorRelation), doc.primary]
              })
          }
        }
      }
    }
    delete documentLocks[doc.primary]
  }

export const createRelationshipHooks = (
  collection: ContentsCollection
): void => {
  collection.postInsert(postInsertRelationship(collection), false)
  collection.preSave(preSaveRelationship(collection), false)
}

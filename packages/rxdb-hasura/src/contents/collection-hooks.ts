import { debug } from '../console'
import { ContentsCollection, ContentsDocument } from '../types'

// const forbiddenInsert = table.columns
//   .filter(column => !column.canInsert.length)
//   .map(column => column.column_name as string)
// const forbibbenUpdate = table.columns
//   .filter(column => !column.canUpdate.length && !column.primaryKey)
//   .map(column => column.column_name as string)
// TODO 1. Set defaut values from permissions "column preset"
// TODO 2. Set to SQL default,
// TODO 3. Cet to NULL (delete) if column is nullable.
// TODO 4. Raise an error otherwise
// TODO BUT we don't want these values to be sent over to the server => delete forbidden keys in the replicator push event
// TODO in the replicator: in the upsert stuff, use only permitted columns in the insert and the update (on conflict) part
// db.collections[name].preInsert((data: Contents) => {
//   forbiddenInsert.forEach(column => delete data[column])
//   return data
// }, false)
// db.collections[name].preSave((data: Contents) => {
//   forbibbenUpdate.forEach(column => delete data[column])
//   return data
// }, false)
// }
// info(`DatabaseService: initialised ${tablesArray.length} collections`)

// ! locks documents when being saved to avoid infitite loop when changing a relationship or its mirror
const documentLocks: Record<string, boolean> = {}
export const createHooks = (collection: ContentsCollection): void => {
  debug('Installing hooks')
  // * The following code is commented: rxdb does not populate deleted documents :)
  // collection.postRemove(async (data, doc) => {
  //   // TODO cascade delete
  //   for (const rel of collection.metadata.relationships.filter(
  //     rel => rel.rel_type === 'object'
  //   )) {
  //     // * Fetch the referenced document
  //     const refDoc: ContentsDocument | null = await doc.populate(
  //       rel.rel_name as string
  //     )
  //     if (refDoc && !documentLocks[refDoc.primary]) {
  //       const mirrorRelation = Object.entries(
  //         refDoc.collection.schema.jsonSchema.properties
  //       ).find(([, value]) => {
  //         return value.ref === collection.name
  //       })?.[0]
  //       if (mirrorRelation) {
  //         // * Mirror array relationship exists and need to be updated
  //         await refDoc.atomicPatch({
  //           [mirrorRelation]: refDoc
  //             .get(mirrorRelation)
  //             .filter((cursor: string) => cursor !== doc.primary)
  //         })
  //       }
  //     }
  //   }
  // }, false)
  collection.postInsert(async (data, doc) => {
    // TODO use 'populate' to simplify
    for (const rel of collection.metadata.relationships) {
      const relName = rel.rel_name as string
      if (!data[relName]) return // * Relation stayed null
      const property = collection.schema.jsonSchema.properties[relName]
      const refCollection = collection.database.hasura[property.ref as string]
      const mirrorRelation = Object.entries(
        refCollection.schema.jsonSchema.properties
      ).find(([, value]) => {
        return value.ref === collection.name
      })?.[0]
      if (!mirrorRelation) return
      if (rel.rel_type === 'array') {
        // * When a One-to-Many (array) relationship changes, update the potential mirror Many-to-One (object) relationship in the referenced collection
        const additions = (data[relName] || []) as string[]
        // * Changes foreign key in the new referenced documents
        for (const addition of additions) {
          const refDoc: ContentsDocument | null = await refCollection
            .findOne(addition)
            .exec()
          if (refDoc && !documentLocks[refDoc.primary])
            await refDoc.atomicPatch({
              [mirrorRelation]: doc.primary
            })
        }
      } else if (rel.rel_type === 'object') {
        // * When a Many-to-One (object) relationship changes, update the potential mirror One-To-Many (array) relationship in the referenced collection
        const newValue = data[relName] as string
        // * Add document from the One-to-Many relationship in the new Many-To-One reference
        const refDoc: ContentsDocument | null = await refCollection
          .findOne(newValue)
          .exec()
        if (refDoc && !documentLocks[refDoc.primary])
          await refDoc.atomicPatch({
            [mirrorRelation]: [...refDoc.get(mirrorRelation), doc.primary]
          })
      }
    }
  }, false)
  collection.preSave(async (data, doc) => {
    // TODO use 'populate' to simplify
    documentLocks[doc.primary] = true
    for (const rel of collection.metadata.relationships) {
      const relName = rel.rel_name as string
      if (!doc[relName] && !data[relName]) return // * Relation stayed null
      const property = collection.schema.jsonSchema.properties[relName]
      const refCollection = collection.database.hasura[property.ref as string]
      const mirrorRelation = Object.entries(
        refCollection.schema.jsonSchema.properties
      ).find(([, value]) => {
        return value.ref === collection.name
      })?.[0]
      if (!mirrorRelation) return
      if (rel.rel_type === 'array') {
        // * When a One-to-Many (array) relationship changes, update the potential mirror Many-to-One (object) relationship in the referenced collection
        const oldValue = (doc[relName] || []) as string[]
        const newValue = (data[relName] || []) as string[]
        // * Changes foreign key in the new referenced documents
        const additions = newValue.filter(value => !oldValue.includes(value))
        for (const addition of additions) {
          const refDoc: ContentsDocument | null = await refCollection
            .findOne(addition)
            .exec()
          if (refDoc && !documentLocks[refDoc.primary])
            await refDoc.atomicPatch({
              [mirrorRelation]: doc.primary
            })
        }
        // * Set foreign key to null in the unreferenced documents
        // TODO if cascade, remove the document
        const deletions = oldValue.filter(value => !newValue.includes(value))
        for (const deletion of deletions) {
          const refDoc: ContentsDocument | null = await refCollection
            .findOne(deletion)
            .exec()
          if (refDoc && !documentLocks[refDoc.primary])
            await refDoc.atomicPatch({
              [mirrorRelation]: null
            })
        }
      } else if (rel.rel_type === 'object') {
        // * When a Many-to-One (object) relationship changes, update the potential mirror One-To-Many (array) relationship in the referenced collection
        const oldValue = doc[relName] as string | undefined
        const newValue = data[relName] as string | undefined
        if (newValue !== oldValue) {
          if (oldValue) {
            // * Remove document from the One-to-Many relationship in the old Many-To-One reference
            const refDoc: ContentsDocument | null = await refCollection
              .findOne(oldValue)
              .exec()
            if (refDoc && !documentLocks[refDoc.primary])
              await refDoc.atomicPatch({
                [mirrorRelation]: (refDoc.get(
                  mirrorRelation
                ) as string[]).filter(key => key !== doc.primary)
              })
          }
          if (newValue) {
            // * Add document from the One-to-Many relationship in the new Many-To-One reference
            const refDoc: ContentsDocument | null = await refCollection
              .findOne(newValue)
              .exec()
            if (refDoc && !documentLocks[refDoc.primary])
              await refDoc.atomicPatch({
                [mirrorRelation]: [...refDoc.get(mirrorRelation), doc.primary]
              })
          }
        }
      }
    }
    delete documentLocks[doc.primary]
  }, false)
}

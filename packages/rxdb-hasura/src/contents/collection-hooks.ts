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
  collection.preInsert(data => {
    console.log('preinsert', data)
  }, false)
  collection.preSave(async (data, doc) => {
    documentLocks[doc.primary] = true
    for (const rel of collection.metadata.relationships) {
      const relName = rel.rel_name as string
      if (!doc[relName] || !data[relName]) return // * Relation stayed null
      const property = collection.schema.jsonSchema.properties[relName]
      const refCollection =
        doc.collection.database.hasura[property.ref as string]
      const mirrorRelation = Object.entries(
        refCollection.schema.jsonSchema.properties
      ).find(([, value]) => {
        return value.ref === collection.name
      })?.[0]
      if (!mirrorRelation) return
      console.log('HERE')
      if (rel.rel_type === 'array') {
        console.log('array')
        // * When a One-to-Many (array) relationship changes, update the potential mirror Many-to-One (object) relationship in the referenced collection
        const oldValue = (doc[relName] || []) as string[]
        const newValue = (data[relName] || []) as string[]
        // * Changes foreign key in the new referenced documents
        const additions = newValue.filter(value => !oldValue.includes(value))
        for (const addition of additions) {
          console.log('addition', addition)
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
          console.log('deletion', deletion)
          const refDoc: ContentsDocument | null = await refCollection
            .findOne(deletion)
            .exec()
          console.log('found', refDoc)
          if (refDoc && !documentLocks[refDoc.primary])
            await refDoc.atomicPatch({
              [mirrorRelation]: undefined
            })
        }
      } else if (rel.rel_type === 'object') {
        console.log('object')
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

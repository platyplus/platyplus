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

export const createHooks = (collection: ContentsCollection): void => {
  debug('Installing hooks')
  collection.preInsert(data => {
    console.log('preinsert', data)
  }, false)
  collection.preSave(async (data, doc) => {
    // * When a Many-to-One (object relationship) changes, update the potential mirror One-To-Many (array relationship) in the referenced collection
    // TODO do it the other way around: when changing an array rel, change the object rel
    for (const rel of collection.metadata.relationships.filter(
      rel => rel.rel_type === 'object'
    )) {
      const relName = rel.rel_name as string
      const oldValue = doc[relName] as string | null
      const newValue = data[relName] as string | null
      if (!oldValue || !newValue) return // * Relation stayed null
      if (newValue !== oldValue) {
        const property = collection.schema.jsonSchema.properties[relName]
        const refCollection =
          doc.collection.database.hasura[property.ref as string]
        const mirrorRelation = Object.entries(
          refCollection.schema.jsonSchema.properties
        ).find(([, value]) => {
          return value.ref === collection.name
        })?.[0]

        if (mirrorRelation) {
          if (oldValue) {
            // * Remove document from the One-to-Many relationship in the old Many-To-One reference
            const oldRef: ContentsDocument | null = await refCollection
              .findOne(oldValue)
              .exec()
            await oldRef?.atomicPatch({
              [mirrorRelation]: (oldRef.get(mirrorRelation) as string[]).filter(
                key => key !== doc.primary
              )
            })
          }
          if (newValue) {
            // * Add document from the One-to-Many relationship in the new Many-To-One reference
            const newRef: ContentsDocument | null = await refCollection
              .findOne(newValue)
              .exec()
            await newRef?.atomicPatch({
              [mirrorRelation]: [...newRef.get(mirrorRelation), doc.primary]
            })
          }
        }
      }
    }
  }, false)
}

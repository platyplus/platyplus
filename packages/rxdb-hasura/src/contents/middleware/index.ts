import { debug } from '../../console'
import { ContentsCollection } from '../../types'
import { createComputedFieldsHooks } from '../computed-fields'
import { createRelationshipHooks } from './relationships'
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
  createRelationshipHooks(collection)
  createComputedFieldsHooks(collection)
}

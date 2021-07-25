import { debug } from '../../console'
import { ContentsCollection } from '../../types'
import { createComputedFieldsHooks } from '../computed-fields'
import { createDefaultValuesHooks } from '../defaults'
import { createRelationshipHooks } from '../relationships'

// TODO 1. Set defaut values from permissions "column preset"
// TODO 2. Set to SQL default,
// TODO 3. Cet to NULL (delete) if column is nullable.
// TODO 4. Raise an error otherwise
// TODO BUT we don't want these values to be sent over to the server => delete forbidden keys in the replicator push event
// TODO in the replicator: in the upsert stuff, use only permitted columns in the insert and the update (on conflict) part

export const createHooks = (collection: ContentsCollection): void => {
  debug('Installing hooks')
  createRelationshipHooks(collection)
  createComputedFieldsHooks(collection)
  createDefaultValuesHooks(collection)
}

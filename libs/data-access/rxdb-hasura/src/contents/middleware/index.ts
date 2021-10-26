import { debug } from '@platyplus/logger'

import { ContentsCollection } from '../../types'
import { createComputedFieldsHooks } from '../computed-fields'
import { createDefaultValuesHooks } from '../defaults'
import {
  createReverseRelationshipHooks,
  createForeignKeyConstraintsHooks
} from '../relationships'
import { createIdHooks } from '../ids'

export const createHooks = (collection: ContentsCollection): void => {
  debug(`Installing hooks on ${collection.name}`)
  createReverseRelationshipHooks(collection)
  createComputedFieldsHooks(collection)
  createDefaultValuesHooks(collection)
  createIdHooks(collection)
  createForeignKeyConstraintsHooks(collection)
}

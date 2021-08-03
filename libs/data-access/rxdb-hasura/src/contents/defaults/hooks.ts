import {
  RxCollectionHookCallback,
  RxCollectionHookNoInstanceCallback
} from 'rxdb'

import {
  Contents,
  ContentsCollection,
  ContentsCollectionMethods,
  ContentsDocumentMethods
} from '../../types'
import { isNullableColumn } from '../required'
import { columnProperties } from '../columns'
import { generateDefaultValue } from './generator'
import { columnHasDefaultValue } from './utils'
import { getCollectionMetadata } from '../../metadata'
import { filteredRelationships } from '../relationships'

// TODO 1. Set defaut values from permissions "column preset"
// TODO 2. Set to SQL default,
// TODO 3. Cet to NULL (delete) if column is nullable.
// TODO 4. Raise an error otherwise
// TODO BUT we don't want these values to be sent over to the server => delete forbidden keys in the replicator push event
// TODO in the replicator: in the upsert stuff, use only permitted columns in the insert and the update (on conflict) part
const defaultValues = async (
  collection: ContentsCollection,
  data: Contents
) => {
  const table = getCollectionMetadata(collection)

  // * Generate column default values
  columnProperties(table, true)
    .filter(
      (col) =>
        data[col.name] == null &&
        !isNullableColumn(col) &&
        columnHasDefaultValue(col)
    )
    .forEach(({ name }) => {
      data[name] = generateDefaultValue(table, name, data)
    })

  filteredRelationships(table)
    .filter(
      (rel) =>
        data[rel.name] == null &&
        rel.type === 'object' &&
        rel.mapping.some(
          ({ column }) =>
            !isNullableColumn(column) && columnHasDefaultValue(column)
        )
    )
    .forEach(({ name }) => {
      data[name] = generateDefaultValue(table, name, data)
    })
}

const saveDefaultValues =
  (
    collection: ContentsCollection
  ): RxCollectionHookCallback<Contents, ContentsDocumentMethods> =>
  async (data, doc: Contents) =>
    await defaultValues(collection, data)

const insertDefaultValues =
  (
    collection: ContentsCollection
  ): RxCollectionHookNoInstanceCallback<Contents, ContentsCollectionMethods> =>
  (data) =>
    defaultValues(collection, data)

export const createDefaultValuesHooks = (
  collection: ContentsCollection
): void => {
  collection.preSave(saveDefaultValues(collection), false)
  collection.preInsert(insertDefaultValues(collection), false)
}

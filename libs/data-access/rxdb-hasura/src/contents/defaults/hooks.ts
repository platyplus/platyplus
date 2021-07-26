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
import { columnProperties } from '../schema'
import { generateDefaultValue } from './generator'
import { columnHasDefaultValue } from './utils'

const defaultValues = async (
  collection: ContentsCollection,
  data: Contents
) => {
  const table = collection.metadata

  // * Generate column default values
  columnProperties(table)
    .filter(
      (col) =>
        data[col.name] == null &&
        !isNullableColumn(col) &&
        columnHasDefaultValue(col)
    )
    .forEach(({ name }) => {
      data[name] = generateDefaultValue(collection, name, data)
    })

  table.relationships
    .filter(
      (rel) =>
        data[rel.rel_name] == null &&
        rel.rel_type === 'object' &&
        rel.mapping.some(
          ({ column }) =>
            !isNullableColumn(column) && columnHasDefaultValue(column)
        )
    )
    .forEach(({ rel_name }) => {
      data[rel_name] = generateDefaultValue(collection, rel_name, data)
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

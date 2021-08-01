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

const defaultValues = async (
  collection: ContentsCollection,
  data: Contents
) => {
  const table = getCollectionMetadata(collection)

  // * Generate column default values
  columnProperties(table)
    .filter(
      (col) =>
        data[col.name] == null &&
        !isNullableColumn(col) &&
        columnHasDefaultValue(col)
    )
    .forEach(({ name }) => {
      data[name] = generateDefaultValue(table, name, data)
    })

  table.relationships
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

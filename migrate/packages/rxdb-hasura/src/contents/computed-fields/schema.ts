import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'

import { ContentsCollection, Metadata } from '../../types'

export const createComputedFieldsProperties = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  table: Metadata
): Record<string, TopLevelProperty | PrimaryProperty> => ({
  label: {
    type: 'string'
  },
  ...table.computedProperties.reduce<
    Record<string, TopLevelProperty | PrimaryProperty>
  >(
    (aggr, curr) => (
      (aggr[curr.name] = {
        type: curr.nullable
          ? ['null', curr.type as string]
          : (curr.type as string)
      }),
      aggr
    ),
    {}
  )
})

/**
 * List of the computed fields of the collection
 * @param collection
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const computedFields = (collection: ContentsCollection): string[] => [
  'label',
  ...collection.metadata.computedProperties.map(prop => prop.name)
]

import { TopLevelProperty } from 'rxdb/dist/types/types'
import { TableFragment } from '../../generated'
import { getCollectionMetadata } from '../../metadata'

import { ContentsCollection } from '../../types'

export const createComputedFieldsProperties = (table: TableFragment) =>
  ({
    label: {
      type: 'string'
    },
    ...table.computedProperties.reduce<Record<string, TopLevelProperty>>(
      (aggr, curr) => {
        aggr[curr.name] = {
          type: curr.nullable ? ['null', curr.type] : curr.type
        }
        return aggr
      },
      {}
    )
  } as Record<string, TopLevelProperty> & { label: TopLevelProperty })

/**
 * List of the computed fields of the collection
 * @param collection
 */
export const computedFields = (collection: ContentsCollection): string[] => [
  'label',
  'updated_at',
  ...getCollectionMetadata(collection).computedProperties.map(
    (prop) => prop.name
  )
]

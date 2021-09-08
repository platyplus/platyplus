import { TopLevelProperty } from 'rxdb/dist/types/types'

import { TableInformation } from '../../metadata'
import { ContentsCollection } from '../../types'
import { UPDATED_AT_COLUMN } from '../columns'

export const createComputedFieldsProperties = (table: TableInformation) =>
  ({
    label: {
      type: 'string'
    }
    // TODO computedProperties
    // ...table.computedProperties.reduce<Record<string, TopLevelProperty>>(
    //   (aggr, curr) => {
    //     aggr[curr.name] = {
    //       type: curr.nullable ? ['null', curr.type] : curr.type
    //     }
    //     return aggr
    //   },
    //   {}
    // )
  } as Record<string, TopLevelProperty> & { label: TopLevelProperty })

/**
 * List of the computed fields of the collection
 * @param collection
 */
export const computedFields = (collection: ContentsCollection): string[] => [
  'label',
  UPDATED_AT_COLUMN
  // TODO computedProperties
  // ...getCollectionTableInfo(collection).computedProperties.map(
  //   (prop) => prop.name
  // )
]

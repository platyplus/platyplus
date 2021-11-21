import { TopLevelProperty } from 'rxdb/dist/types/types'

import { TableInformation } from '../../metadata'
import { ContentsCollection } from '../../types'
import { LABEL_COLUMN, UPDATED_AT_COLUMN } from '../columns'

export const createComputedFieldsProperties = (table: TableInformation) =>
  ({
    [LABEL_COLUMN]: {
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
  } as Record<string, TopLevelProperty> & { [LABEL_COLUMN]: TopLevelProperty })

/**
 * List of the computed fields of the collection
 * @param collection
 */
export const computedFields = (collection: ContentsCollection): string[] => [
  LABEL_COLUMN,
  UPDATED_AT_COLUMN
  // TODO computedProperties
  // ...getCollectionTableInfo(collection).computedProperties.map(
  //   (prop) => prop.name
  // )
]

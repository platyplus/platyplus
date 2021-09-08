import { RxJsonSchema } from 'rxdb'

import { Contents } from '../../types'
import { TableInformation, tableName } from '../../metadata'
import { createComputedFieldsProperties } from '../computed-fields'
import { createColumnProperties } from '../columns'
import { createRelationshipProperties } from '../relationships'
import { requiredProperties } from '../required'
import { ID_COLUMN, isIdColumn } from '../ids'
import { indexes } from './indexes'

export const toJsonSchema = (
  table: TableInformation,
  role: string,
  version = 0
): RxJsonSchema<Contents> => {
  return {
    // keyCompression: true,
    type: 'object',
    title: tableName(table),
    // description: '', // ? Use SQL table comment ?
    version,
    primaryKey: {
      key: ID_COLUMN,
      fields: table.columns
        .filter((column) => isIdColumn(table, column))
        .map((column) => column.name),
      separator: '|'
    },
    properties: {
      ...table.columns
        .filter((column) => isIdColumn(table, column))
        .reduce(
          (acc, column) => {
            acc[column.name] = { type: 'string' }
            return acc
          },
          { id: { type: 'string' } }
        ),
      updated_at: { type: 'string' },
      is_local_change: { type: ['boolean', 'null'] },
      ...createColumnProperties(table),
      ...createRelationshipProperties(table, role),
      ...createComputedFieldsProperties(table)
    },
    required: requiredProperties(table),
    indexes: indexes(table)
  } as RxJsonSchema<Contents>
}

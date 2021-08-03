import { RxJsonSchema } from 'rxdb'

import { Contents } from '../../types'
import { metadataName } from '../../utils'
import { TableFragment } from '../../generated'
import { createComputedFieldsProperties } from '../computed-fields'
import { createColumnProperties } from '../columns'
import { createRelationshipProperties } from '../relationships'
import { requiredProperties } from '../required'
import { isIdColumn } from '../ids'
import { indexes } from './indexes'

export const toJsonSchema = (
  table: TableFragment,
  role: string
): RxJsonSchema<Contents> => {
  const result: RxJsonSchema<Contents> = {
    // keyCompression: true,
    type: 'object',
    title: metadataName(table),
    // description: '', // ? Use SQL table comment ? not in metadata yet
    version: 0,
    primaryKey: {
      key: 'id',
      fields: table.columns
        .filter((column) => isIdColumn(column))
        .map((column) => column.name),
      separator: '|'
    },
    properties: {
      id: { type: 'string' },
      updated_at: { type: 'string' },
      is_local_change: { type: ['boolean', 'null'] },
      ...createColumnProperties(table),
      ...createRelationshipProperties(table, role),
      ...createComputedFieldsProperties(table)
    },
    required: requiredProperties(table),
    indexes: indexes(table)
  }

  return result
}

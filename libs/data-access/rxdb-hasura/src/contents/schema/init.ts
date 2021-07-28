import { RxJsonSchema } from 'rxdb'

import { Contents, Metadata } from '../../types'
import { metadataName } from '../../utils'
import { createComputedFieldsProperties } from '../computed-fields'
import { createColumnProperties } from './columns'
import { isIdColumn } from '../ids'
import { indexes } from './indexes'
import { createRelationshipProperties } from '../relationships'
import { requiredProperties } from '../required'

export const toJsonSchema = (
  table: Metadata,
  role: string
): RxJsonSchema<Contents> => {
  // TODO get the query/mutations/subscription names for building graphql queries
  const result: RxJsonSchema<Contents> = {
    // keyCompression: true,
    type: 'object',
    title: metadataName(table),
    description: '', // TODO table comment not in metadata yet
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

  // TODO custom domains
  // See https://dba.stackexchange.com/questions/68266/what-is-the-best-way-to-store-an-email-address-in-postgresql
  // TODO unique columns or sets of columns: tricky. in a hook? don't forget to index. See https://github.com/pubkey/rxdb/issues/728
  // TODO min/max number values
  // TODO default values (in a hook)
  // TODO computed values / functions (to be defined)
  // TODO validation (to be defined). check constraints. Put what can be put in json schema, the rest in a hook
  // TODO final values (if no update permissions?)
  // TODO encryption (to be defined)
  // TODO relationships
  // ? additionalProperties: true

  return result
}

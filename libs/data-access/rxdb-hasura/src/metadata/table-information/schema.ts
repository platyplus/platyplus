import { RxJsonSchema } from 'rxdb'
import { TableInfo } from './types'

export const schema: RxJsonSchema<TableInfo> = {
  title: 'tables schema',
  version: 0,
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {
      type: 'string'
    },
    updated_at: {
      type: 'string'
    },
    metadata: {
      type: ['object', 'null']
    },
    columns: {
      type: 'array',
      items: {
        type: 'object'
      }
    },
    primaryKey: {
      type: ['object', 'null']
    },
    foreignKeys: {
      type: 'array',
      items: {
        type: 'object'
      }
    },
    dependentForeignKeys: {
      type: 'array',
      items: {
        type: 'object'
      }
    },
    indexes: {
      type: 'array',
      items: {
        type: 'object'
      }
    }
  }
}

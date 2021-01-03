import { RxJsonSchema } from 'rxdb'

export const metadataSchema: RxJsonSchema = {
  title: 'metadata schema',
  version: 0,
  description: 'Ha',
  type: 'object',
  properties: {
    full_name: { type: 'string', primary: true },
    table_name: {
      type: 'string'
    },
    table_schema: {
      type: 'string'
    },
    primaryKey: {
      type: 'object'
    },
    config: {
      type: ['object', 'null']
    },

    relationships: {
      type: 'array',
      items: {
        type: 'object'
      }
    },
    columns: {
      type: 'array',
      items: {
        type: 'object'
      }
    }
  }
}

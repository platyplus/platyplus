import { JsonSchema, RxJsonSchema } from 'rxdb'
import { Metadata } from '../types'

const permissionAggregate: JsonSchema = {
  type: 'object',
  properties: {
    aggregate: {
      type: 'object',
      properties: {
        count: { type: 'number' }
      }
    }
  }
}
export const metadataSchema: RxJsonSchema<Metadata> = {
  title: 'metadata schema',
  version: 0,
  description: 'Ha',
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {
      type: 'string'
    },
    table_name: {
      type: 'string'
    },
    table_schema: {
      type: 'string'
    },
    primaryKey: {
      type: ['object', 'null']
    },
    indexes: {
      type: 'array'
    },
    view: {
      type: ['object', 'null']
    },
    config: {
      type: ['object', 'null'],
      items: {
        type: 'object',
        properties: {
          document_label: { type: ['string', 'null'] }
        }
      }
    },
    canSelect_aggregate: permissionAggregate,
    canInsert_aggregate: permissionAggregate,
    canUpdate_aggregate: permissionAggregate,
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
    },

    computedProperties: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          transformation: { type: ['string', 'null'] },
          template: { type: ['string', 'null'] }
        }
      }
    }
  }
}

import { JsonSchema, RxJsonSchema } from 'rxdb'

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
    propertiesConfig: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          property_name: { type: ['string', 'null'] },
          title: { type: ['string', 'null'] },
          description: { type: ['string', 'null'] },
          icon: { type: ['string', 'null'] }
        }
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

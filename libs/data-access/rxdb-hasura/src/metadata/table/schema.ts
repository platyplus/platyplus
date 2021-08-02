import { RxJsonSchema } from 'rxdb'
import { TableFragment } from '../../generated'

export const metadataSchema: RxJsonSchema<TableFragment> = {
  title: 'metadata schema',
  version: 0,
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    schema: {
      type: 'string'
    },
    primaryKey: {
      type: ['object', 'null']
    },
    foreignKeys: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          columns: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          onDelete: {
            type: 'string'
          }
        }
      }
    },
    indexes: {
      type: 'array'
    },
    view: {
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

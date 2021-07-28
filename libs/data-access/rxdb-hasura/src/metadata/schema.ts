import { RxJsonSchema } from 'rxdb'
import { Metadata } from '../types'

export const metadataSchema: RxJsonSchema<Metadata> = {
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
          documentLabel: { type: ['string', 'null'] }
        }
      }
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

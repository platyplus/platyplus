import { RxJsonSchema } from 'rxdb'
import { TableConfig } from './types'

export const schema: RxJsonSchema<TableConfig> = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    updated_at: {
      type: 'string'
    },
    // deleted
    component: {
      type: ['string', 'null']
    },
    description: {
      type: ['string', 'null']
    },
    document_label: {
      type: ['string', 'null']
    },
    document_title: {
      type: ['string', 'null']
    },
    document_component: {
      type: ['string', 'null']
    },
    icon: {
      type: ['string', 'null']
    },
    order: {
      type: ['array', 'null'],
      items: {
        type: 'string'
      }
    },
    title: {
      type: ['string', 'null']
    }
  },
  indexes: ['updated_at'],
  required: ['id']
}

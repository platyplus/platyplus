import { RxJsonSchema } from 'rxdb'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const schema: RxJsonSchema<any> = {
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

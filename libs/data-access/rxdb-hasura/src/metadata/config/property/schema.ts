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
    table_id: {
      type: ['string', 'null']
    },
    property_name: {
      type: ['string', 'null']
    },
    component: {
      type: ['string', 'null']
    },
    json_schema: {
      type: ['object', 'null']
    },
    icon: {
      type: ['string', 'null']
    },
    title: {
      type: ['string', 'null']
    },
    description: {
      type: ['string', 'null']
    }
  },
  indexes: ['updated_at'],
  required: ['id']
}

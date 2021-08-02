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
    menu_order: {
      type: ['array', 'null'],
      items: {
        type: 'string'
      }
    }
  },
  indexes: ['updated_at'],
  required: ['id']
}

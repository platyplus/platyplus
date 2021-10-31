import { RxJsonSchema } from 'rxdb'
import { AppConfig } from './types'

export const schema: RxJsonSchema<AppConfig> = {
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
    menu: {
      type: ['array', 'null'],
      items: {
        type: 'object'
      }
    }
  },
  indexes: ['updated_at'],
  required: ['id']
}

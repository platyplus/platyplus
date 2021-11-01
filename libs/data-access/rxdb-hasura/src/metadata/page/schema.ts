import { RxJsonSchema } from 'rxdb'
import { Page } from './types'

export const schema: RxJsonSchema<Page> = {
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
    icon: {
      type: ['string', 'null']
    },
    title: {
      type: ['string', 'null']
    },
    contents: {
      type: 'string'
    },
    slug: {
      type: 'string'
    }
  },
  indexes: ['updated_at', 'slug'],
  required: ['id']
}

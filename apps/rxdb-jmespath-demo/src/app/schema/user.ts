import type { RxJsonSchema } from 'rxdb'

export interface User {
  id: string
  name: string
  email: string
  address: {
    street: string
    city: string
    zipcode: string
    country: string
  }
  posts: string[]
  comments: string[]
}

export const userSchema: RxJsonSchema<User> = {
  title: 'user',
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
    email: {
      type: 'string',
      format: 'email'
    },
    address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
        zipcode: { type: 'string' },
        country: { type: 'string' }
      }
    },
    posts: {
      type: 'array',
      ref: 'posts',
      items: {
        type: 'string'
      }
    },
    comments: {
      type: 'array',
      ref: 'comments',
      items: {
        type: 'string'
      }
    }
  },
  indexes: []
}

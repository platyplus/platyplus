import type { RxJsonSchema } from 'rxdb'

export interface Post {
  id: string
  user: string
  title: string
  body: string
  comments: string[]
}

export const postSchema: RxJsonSchema<Post> = {
  title: 'post',
  version: 0,
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {
      type: 'string'
    },
    user: {
      ref: 'users',
      type: 'string'
    },
    title: {
      type: 'string'
    },
    body: {
      type: 'string'
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

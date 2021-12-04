import type { RxJsonSchema } from 'rxdb'

export interface Comment {
  id: string
  user: string
  post: string
  body: string
}

export const commentSchema: RxJsonSchema<Comment> = {
  title: 'comment',
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
    post: {
      ref: 'posts',
      type: 'string'
    },
    body: {
      type: 'string'
    }
  },
  indexes: []
}

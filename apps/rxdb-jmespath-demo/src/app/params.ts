import { CollectionNames } from './types'

export const LIMITS: Record<CollectionNames, number> = {
  users: 10,
  posts: 100,
  comments: 1000
}

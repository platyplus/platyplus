import type { RxCollection, RxDatabase } from 'rxdb'
import type { Post, User } from './schema'
export type CollectionNames = 'users' | 'posts' | 'comments'
export type Collections = {
  comments: RxCollection<Comment>
  posts: RxCollection<Post>
  users: RxCollection<User>
}
export type Database = RxDatabase<Collections>

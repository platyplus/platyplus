import type { RxCollection, RxDatabase } from 'rxdb'
import type { Album, Photo, Post, Todo, User } from './schema'

export type Collections = {
  albums: RxCollection<Album>
  comments: RxCollection<Comment>
  photos: RxCollection<Photo>
  posts: RxCollection<Post>
  todos: RxCollection<Todo>
  users: RxCollection<User>
}
export type Database = RxDatabase<Collections>

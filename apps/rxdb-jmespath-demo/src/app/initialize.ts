import {
  createRxDatabase,
  addPouchPlugin,
  getRxStoragePouch,
  RxJsonSchema,
  RxCollection,
  addRxPlugin
} from 'rxdb'
import { plugin } from '@platyplus/rxdb-plugin-jmespath'
import {
  User,
  Post,
  Comment,
  commentSchema,
  postSchema,
  userSchema
} from './schema'
import { Collections, Database } from './types'
import { createComment, createPost, createUser } from './random'
import { LIMITS } from './params'
import memoryAdapter from 'pouchdb-adapter-memory'

const setupCollection = async <T>(
  db: Database,
  collectionName: string,
  schema: RxJsonSchema<T>,
  documents: T[]
): Promise<RxCollection> => {
  const collection = await db.addCollections({
    [collectionName]: {
      schema
    }
  })
  await collection[collectionName].bulkInsert(documents)
  return collection[collectionName]
}

export const initialize = async () => {
  addPouchPlugin(memoryAdapter)
  addRxPlugin(plugin)

  const db = await createRxDatabase<Collections>({
    name: 'test_database',
    storage: getRxStoragePouch('memory'),
    ignoreDuplicate: true
  })

  const comments: Map<string, Comment> = new Map()
  const posts: Map<string, Post> = new Map()
  const users: Map<string, User> = new Map()

  for (let x = 0; x < LIMITS.users; x++) {
    users.set(x.toString(), createUser(x))
  }

  for (let x = 0; x < LIMITS.posts; x++) {
    const post = createPost(x)
    posts.set(x.toString(), post)
    users.get(post.user).posts.push(post.id)
  }

  for (let x = 1; x <= LIMITS.comments; x++) {
    const comment = createComment(x)
    users.get(comment.user).comments.push(comment.id)
    posts.get(comment.post).comments.push(comment.id)
    comments.set(x.toString(), comment)
  }

  await setupCollection(
    db,
    'comments',
    commentSchema,
    Array.from(comments.values())
  )
  await setupCollection(db, 'posts', postSchema, Array.from(posts.values()))
  await setupCollection(db, 'users', userSchema, Array.from(users.values()))
  return db
}

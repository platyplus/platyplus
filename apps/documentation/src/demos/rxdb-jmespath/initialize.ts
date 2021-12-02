import {
  createRxDatabase,
  addPouchPlugin,
  getRxStoragePouch,
  RxJsonSchema,
  RxCollection,
  addRxPlugin
} from 'rxdb'
import faker from 'faker'
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
  addPouchPlugin(require('pouchdb-adapter-memory'))
  addRxPlugin(plugin)

  const db = await createRxDatabase<Collections>({
    name: 'test_database',
    storage: getRxStoragePouch('memory'),
    ignoreDuplicate: true
  })

  const albums: Map<number, Album> = new Map()
  const comments: Map<number, Comment> = new Map()
  const photos: Map<number, Photo> = new Map()
  const posts: Map<number, Post> = new Map()
  const todos: Map<number, Todo> = new Map()
  const users: Map<number, User> = new Map()

  const NB_USERS = 10
  const NB_POSTS = 100
  const NB_COMMENTS = 1000
  const NB_ALBUMS = 100
  const NB_PHOTOS = 5000
  const NB_TODOS = 200

  for (let x = 0; x < NB_USERS; x++) {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const user: User = {
      id: x.toString(),
      name: `${firstName} ${lastName}`,
      email: faker.internet.email(firstName, lastName),
      address: {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        country: faker.address.country(),
        zipcode: faker.address.zipCode()
      },
      posts: [],
      comments: []
    }
    users.set(x, user)
  }

  for (let x = 0; x < NB_POSTS; x++) {
    const userId = faker.datatype.number(NB_USERS - 1)
    const post: Post = {
      id: x.toString(),
      user: userId.toString(),
      title: faker.lorem.words(3),
      body: faker.lorem.paragraph(),
      comments: []
    }
    users.get(userId).posts.push(post.id)
    posts.set(x, post)
  }

  for (let x = 1; x <= NB_COMMENTS; x++) {
    const userId = faker.datatype.number(NB_USERS - 1)
    const postId = faker.datatype.number(NB_POSTS - 1)
    const comment: Comment = {
      id: x.toString(),
      user: userId.toString(),
      post: postId.toString(),
      body: faker.lorem.sentences(3)
    }
    users.get(userId).comments.push(comment.id)
    posts.get(postId).comments.push(comment.id)
    comments.set(x, comment)
  }

  // await setupCollection(db, 'albums', albumSchema, [])
  await setupCollection(
    db,
    'comments',
    commentSchema,
    Array.from(comments.values())
  )
  // await setupCollection(db, 'photos', photoSchema, [])
  await setupCollection(db, 'posts', postSchema, Array.from(posts.values()))
  // await setupCollection(db, 'todos', todoSchema, [])
  await setupCollection(db, 'users', userSchema, Array.from(users.values()))
  return db
}

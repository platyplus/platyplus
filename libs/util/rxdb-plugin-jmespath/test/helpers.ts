import {
  RxDatabase,
  RxCollection,
  createRxDatabase,
  isRxDatabase,
  RxJsonSchema
} from 'rxdb'
import memoryAdapter from 'pouchdb-adapter-memory'
import { addPouchPlugin, getRxStoragePouch } from 'rxdb/plugins/pouchdb'

import { Book, books, booksSchema } from './books'
import { Author, authors, authorsSchema } from './authors'

type Collections = { books: RxCollection<Book>; authors: RxCollection<Author> }

export type Database = RxDatabase<Collections>

export const createDatabase = async (): Promise<Database> => {
  addPouchPlugin(memoryAdapter)
  try {
    const db = await createRxDatabase<Collections>({
      name: 'test_database',
      storage: getRxStoragePouch('memory'),
      ignoreDuplicate: true
    })
    return db
  } catch (error) {
    return null as Database
  }
}

export const setupCollection = async <T>(
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

export const setup = async (): Promise<Database> => {
  const db = await createDatabase()
  await setupCollection(db, 'books', booksSchema, books)
  await setupCollection(db, 'authors', authorsSchema, authors)
  return db
}

export const teardown = async (db: Database): Promise<void> => {
  if (isRxDatabase(db)) {
    await db.destroy()
  }
}

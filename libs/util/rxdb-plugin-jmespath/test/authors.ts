import { RxJsonSchema } from 'rxdb'

export interface Author {
  id: string
  name: string
  books: string[]
}

export const authorsSchema: RxJsonSchema<Author> = {
  title: 'author',
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
    books: {
      type: 'array',
      ref: 'books',
      items: {
        type: 'string'
      }
    }
  },
  indexes: ['name']
}

export const authors: Author[] = [
  {
    id: '1',
    name: 'Ernest Hemingway',
    books: ['5']
  },
  {
    id: '2',
    name: 'John Steinbeck',
    books: ['3', '4']
  },
  {
    id: '3',
    name: 'William Faulkner',
    books: ['1', '2']
  }
]

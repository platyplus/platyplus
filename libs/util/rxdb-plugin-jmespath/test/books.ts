import { RxJsonSchema } from 'rxdb'

export interface Book {
  id: string
  title: string
  author: string
}

export const booksSchema: RxJsonSchema<Book> = {
  title: 'book',
  version: 0,
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    author: {
      ref: 'authors',
      type: 'string'
    }
  },
  indexes: ['title']
}

export const books: Book[] = [
  {
    id: '1',
    title: 'The Sound and the Fury',
    author: '3'
  },
  {
    id: '2',
    title: 'Absalom, Absalom!',
    author: '3'
  },
  {
    id: '3',
    title: 'Of Mice and Men',
    author: '2'
  },
  {
    id: '4',
    title: 'The Grapes of Wrath',
    author: '2'
  },
  {
    id: '5',
    title: 'From Whom the Bell Tolls',
    author: '1'
  }
]

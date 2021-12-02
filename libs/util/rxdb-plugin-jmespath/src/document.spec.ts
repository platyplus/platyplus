import { Database, setup, teardown, books, authors, Book } from '../test'
import { addRxPlugin } from 'rxdb'
import { plugin } from './plugin'
import { skip, switchMap } from 'rxjs'

addRxPlugin(plugin)

describe('document', () => {
  let db: Database

  beforeEach(async () => {
    db = await setup()
  })

  afterEach(async () => {
    await teardown(db)
  })

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [soundAndFury, absalom, miceAndMen, grapesWarth, bellTolls] = books
  const [hemmingway, steinbeck, faulkner] = authors
  /* eslint-enable @typescript-eslint/no-unused-vars */

  it('should get a simple expression', (done) => {
    db.collections.books
      .findOne(soundAndFury.id)
      .exec()
      .then((doc) => {
        doc.jmespath$('title').subscribe({
          next: (result) => {
            expect(result).toEqual(soundAndFury.title)
            done()
          },
          error: done
        })
      })
  })

  it(`should populate an object: get the name of the author's book`, (done) => {
    db.collections.books
      .findOne(soundAndFury.id)
      .exec()
      .then((doc) => {
        doc.jmespath$('author.name').subscribe({
          next: (result) => {
            expect(result).toEqual(faulkner.name)
            done()
          },
          error: done
        })
      })
  })

  it('should populate an array: get books of an author', (done) => {
    const expected = books
      .filter((book) => book.author === faulkner.id)
      .map((book) => book.title)
    db.collections.authors
      .findOne(faulkner.id)
      .exec()
      .then((doc) => {
        doc.jmespath$('books[].title').subscribe({
          next: (result) => {
            expect(result).toEqual(expected)
            done()
          },
          error: done
        })
      })
  })

  it('should nest populations: get books of the same author', (done) => {
    const expected = books
      .filter((book) => book.author === faulkner.id)
      .map((book) => book.title)
    db.collections.books
      .findOne(soundAndFury.id)
      .exec()
      .then((doc) => {
        doc.jmespath$('author.books[].title').subscribe({
          next: (result) => {
            expect(result).toEqual(expected)
            done()
          },
          error: done
        })
      })
  })

  it('should update a field referenced in a population', (done) => {
    const name = 'Usurper'
    db.collections.books
      .findOne(soundAndFury.id)
      .exec()
      .then((doc) => {
        doc
          .jmespath$('author.name')
          .pipe(skip(1))
          .subscribe({
            next: (result) => {
              expect(result).toEqual(name)
              done()
            },
            error: done
          })
      })
    db.collections.authors
      .findOne(faulkner.id)
      .exec()
      .then((author) => {
        author.atomicPatch({ name })
      })
  })

  it('should update a field', (done) => {
    db.collections.books
      .findOne(absalom.id)
      .exec()
      .then(async (doc) => {
        const title = 'new book title'
        doc
          .jmespath$('title')
          .pipe(skip(1))
          .subscribe({
            next: (result) => {
              expect(result).toEqual(title)
              done()
            },
            error: done
          })
        await doc.atomicPatch({ title })
      })
  })
  it('should take deleted document into account', (done) => {
    db.collections.books
      .findOne(absalom.id)
      .remove()
      .then(async (doc) => {
        doc.jmespath$('title').subscribe({
          next: (result) => {
            expect(result).toBeNull()
            done()
          },
          error: done
        })
      })
  })

  it('should reflect a deleted document in a population', (done) => {
    const expected = books
      .filter(({ author, id }) => author === faulkner.id && id !== absalom.id)
      .map((book) => book.title)
    db.collections.authors
      .findOne(faulkner.id)
      .$.pipe(
        switchMap((doc) => doc.jmespath$('books[].title')),
        skip(1)
      )
      .subscribe({
        next: (result) => {
          expect(result).toEqual(expected)
          done()
        },
        error: done
      })
    db.collections.books
      .findOne(absalom.id)
      .exec()
      .then((doc) => doc.remove())
  })

  it('should use a function with a population', (done) => {
    db.collections.authors
      .findOne(hemmingway.id)
      .$.pipe(switchMap((doc) => doc.jmespath$('sort_by(books, &title)[]')))
      .subscribe({
        next: (result) => {
          expect(result.length).toEqual(1)
          expect(result[0].id).toEqual(bellTolls.id)
          done()
        },
        error: done
      })
  })

  // TODO TEST EXPRESSIONS IMPACTED BY toArray!!!

  it('should insert a document and take it into account', (done) => {
    const asILayDying: Book = {
      id: '10',
      title: 'As I Lay Dying',
      author: faulkner.id
    }
    const expected = [
      ...books
        .filter(({ author }) => author === faulkner.id)
        .map((book) => book.title),
      asILayDying.title
    ]
    db.collections.authors
      .findOne(faulkner.id)
      .$.pipe(
        switchMap((doc) => doc.jmespath$('books[].title')),
        skip(1)
      )
      .subscribe({
        next: (result) => {
          expect(result).toEqual(expected)
          done()
        },
        error: done
      })
    db.collections.books.insert(asILayDying).then((book) =>
      db.collections.authors
        .findOne(faulkner.id)
        .exec()
        .then((author) =>
          author.atomicPatch({ books: [...author.books, book.id] })
        )
    )
  })
})

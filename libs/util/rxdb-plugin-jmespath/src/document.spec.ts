import { Database, setup, teardown, books, authors } from '../test'
import { addRxPlugin } from 'rxdb'
import { plugin } from './plugin'
import { skip, of } from 'rxjs'
import { search$ } from '@platyplus/rx-jmespath'

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
    db.collections.authors
      .findOne(faulkner.id)
      .exec()
      .then((doc) => {
        doc.jmespath$('books[].title').subscribe({
          next: (result) => {
            expect(result).toEqual(
              books
                .filter((book) => book.author === faulkner.id)
                .map((book) => book.title)
            )
            done()
          },
          error: done
        })
      })
  })

  it('should nest populations: get books of the same author', (done) => {
    db.collections.books
      .findOne(soundAndFury.id)
      .exec()
      .then((doc) => {
        doc.jmespath$('author.books[].title').subscribe({
          next: (result) => {
            expect(result).toEqual(
              books
                .filter((book) => book.author === faulkner.id)
                .map((book) => book.title)
            )
            done()
          },
          error: done
        })
      })
  })

  it('should update a field referenced in a population', (done) => {
    db.collections.books
      .findOne(soundAndFury.id)
      .exec()
      .then((doc) => {
        const name = 'Usurper'
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
        db.collections.authors
          .findOne(faulkner.id)
          .exec()
          .then((author) => {
            author.atomicPatch({ name })
          })
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
  it('should work', (done) => {
    of({
      reservations: [{ instances: [{ foo: 1 }, { foo: 2 }] }]
    })
      .pipe(search$('reservations[].notinstances[].foo'))
      .subscribe((value) => {
        expect(value).toEqual([])
        done()
      })
  })
  // TODO test populations
  // TODO test object properties
  // TODO test array properties
  // TODO test remove
  // TODO test update
  // TODO test insert
})

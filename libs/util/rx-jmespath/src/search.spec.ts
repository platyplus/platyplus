import { first, from, last, of } from 'rxjs'
import { search$ } from './search'
import type { ObjectType } from './jmespath'
import path from 'path'
import fs from 'fs'

type Test = {
  comment?: string
  given: ObjectType
  cases: Array<{ expression: string; result?: ObjectType; error?: string }>
}

// * Compliance tests are a copy-paste of the original jmespath library
const compliancePath = path.join(__dirname, '../compliance')
// const compliancePath = path.join(
//   path.dirname(require.resolve('jmespath/test')),
//   'compliance'
// )

const addTestSuitesFromFile = (filename: string) => {
  const spec: Test[] = JSON.parse(fs.readFileSync(filename).toString())
  describe(path.basename(filename), () => {
    for (const test of spec) {
      const given$ = of(test.given)
      describe(`${test.comment ? test.comment + ': ' : ''}${JSON.stringify(
        test.given
      )}`, () => {
        const cases = test.cases
        for (const testcase of cases) {
          if (testcase.error) {
            it(`should raise an error (${testcase.error}) with expression ${testcase.expression}`, (done) => {
              given$.pipe(search$(testcase.expression)).subscribe({
                next: () => done('should not be reached'),
                error: () => done()
              })
            })
          } else {
            it(`should pass with expression ${testcase.expression}`, (done) => {
              given$.pipe(search$(testcase.expression)).subscribe({
                next: (result) => {
                  expect(result).toEqual(testcase.result)
                  done()
                },
                error: done
              })
            })
          }
        }
      })
    }
  })
}

const notImplementedYet: string[] = []
const listing = fs.readdirSync(compliancePath)
for (const name of listing) {
  const filename = path.join(compliancePath, name)
  if (
    fs.statSync(filename).isFile() &&
    path.extname(filename) === '.json' &&
    notImplementedYet.indexOf(path.basename(filename)) === -1
  ) {
    addTestSuitesFromFile(filename)
  }
}
describe('observable expressions', () => {
  const expression$ = of('a.b.c')
  const given$ = of({ a: { b: { c: 'hello' } } })
  it('should pass with an observable expression', (done) => {
    given$.pipe(search$(expression$)).subscribe({
      next: (result) => {
        expect(result).toEqual('hello')
        done()
      },
      error: done
    })
  })
})

describe('monitor changes', () => {
  const expression$ = 'a.b.c'
  const given = from([
    { a: { b: { c: 'hello' } } },
    { a: { b: { c: 'world' } } }
  ])
  it('should pass when changing value', (done) => {
    given
      .pipe(search$(expression$))
      .pipe(first())
      .subscribe({
        next: (result) => {
          expect(result).toEqual('hello')
        },
        error: done
      })
    given
      .pipe(search$(expression$))
      .pipe(last())
      .subscribe({
        next: (result) => {
          expect(result).toEqual('world')
          done()
        },
        error: done
      })
  }, 300)
})

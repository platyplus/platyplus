import { isRxDocument, RxDocument, RxPlugin, RxQuery } from 'rxdb'
import { of, switchMap } from 'rxjs'
import { search$ } from '@platyplus/rx-jmespath'

const getField = (value, key: string | number) => {
  const field = value[key] ?? null
  if (typeof key === 'number') return of(field)
  if (isRxDocument(value)) {
    const document: RxDocument = value
    // TODO document.deleted$
    const definition = value.collection.schema.jsonSchema.properties[key]
    if (definition) {
      if (definition.ref) {
        return document.get$(key).pipe(switchMap(() => document.populate(key)))
      } else {
        return document.get$(key)
      }
    }
  }
  return of(field)
}

export const plugin: RxPlugin = {
  name: 'platyplus',
  rxdb: true,
  prototypes: {
    RxDocument: (proto: RxDocument) => {
      proto.jmespath$ = function (expression) {
        return of(this).pipe(search$(expression, { getField }))
      }
    },
    RxQuery: (proto: RxQuery) => {
      proto.jmespath$ = function (expression) {
        //   ! Not correct !
        // TODO implement tests
        // TODO make it work for both single and array queries
        return this.$.pipe(search$(expression, { getField }))
      }
    }
  }
}

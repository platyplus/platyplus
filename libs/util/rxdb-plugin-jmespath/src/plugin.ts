import { isRxDocument, RxDocument, RxPlugin, RxQuery } from 'rxdb'
import { combineLatest, map, Observable, of, switchMap } from 'rxjs'
import { search$, SearchOptions } from '@platyplus/rx-jmespath'

const trimSystemFields = (value: Record<string, unknown>) =>
  Object.entries(value).reduce((acc, [k, v]) => {
    if (!k.startsWith('_')) acc[k] = v
    return acc
  }, {})

const options: SearchOptions<{ systemFields: boolean; deleted: boolean }> = {
  getField: (value, key: string | number, options) => {
    if (!options.systemFields && typeof key === 'string' && key.startsWith('_'))
      return of(null)

    if (isRxDocument(value)) {
      const document: RxDocument = value
      // TODO combineLatest as per getIdentity
      return document.deleted$.pipe(
        switchMap((deleted) => {
          if (!options.deleted && deleted) return of(null)
          if (typeof key === 'number') return of(value[key] ?? null)
          const definition = value.collection.schema.jsonSchema.properties[key]
          if (definition) {
            if (definition.ref) {
              return document
                .get$(key)
                .pipe(switchMap(() => document.populate(key)))
            } else {
              return document.get$(key)
            }
          } else return of(value[key] ?? null)
        })
      )
    } else return of(value[key] ?? null)
  },

  getIdentity: (value, { systemFields }) => {
    if (isRxDocument(value)) {
      const document: RxDocument = value
      return combineLatest([document.deleted$, document.$]).pipe(
        map(([deleted, value]) => {
          if (!options.deleted && deleted) return of(null)
          else {
            if (systemFields) return value
            else return trimSystemFields(value)
          }
        })
      )
    } else return of(value)
  },
  circularData: true,
  systemFields: false,
  deleted: false
}
export const plugin: RxPlugin = {
  name: 'platyplus',
  rxdb: true,
  prototypes: {
    RxDocument: (proto: RxDocument) => {
      proto.jmespath$ = function (
        expression: string | Observable<string>,
        { systemFields = false, deleted = false } = {
          systemFields: false,
          deleted: false
        }
      ) {
        return of(this).pipe(
          search$(expression, { ...options, systemFields, deleted })
        )
      }
    },
    RxQuery: (proto: RxQuery) => {
      proto.jmespath$ = function (
        expression: string | Observable<string>,
        { systemFields = false, deleted = false } = {
          systemFields: false,
          deleted: false
        }
      ) {
        //   ! Not correct !
        // TODO implement tests
        // TODO make it work for both single and array queries
        return this.$.pipe(
          search$(expression, { ...options, systemFields, deleted })
        )
      }
    }
  }
}

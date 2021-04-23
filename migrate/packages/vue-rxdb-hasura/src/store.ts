import {
  castValue,
  Contents,
  ContentsCollection,
  ContentsDocument,
  Database
} from '@platyplus/rxdb-hasura'
import * as immutable from 'object-path-immutable'
import { Ref } from 'vue'
import { Store } from 'vuex'

type State = {
  forms: Record<string, Record<string, Contents>>
}
const state = (): State => ({
  forms: {}
})

export const addModule = <R>(
  db: Ref<Database | undefined>,
  store: Store<R>
): void => {
  store.registerModule('rxdb', {
    namespaced: true,
    state,
    getters: {
      form: state => state.forms,
      getField: state => (document: ContentsDocument, field: string) =>
        document &&
        immutable.get(
          state.forms,
          `${document.collection.name}.${document.primary}.${field}`
        ),
      getCollection: state => (collection: ContentsCollection) =>
        immutable.get(state.forms, collection.name)
    },
    actions: {
      save: async ({ state, commit }) => {
        if (!db.value) return
        for (const [collectionName, documents] of Object.entries(state.forms)) {
          const collection = db.value[collectionName]
          for (const [documentId, formValues] of Object.entries(documents)) {
            const document = await collection.findOne(documentId).exec()
            if (document) {
              const changed = Object.entries(formValues).some(
                ([key, value]) => document.get(key) !== value
              )
              if (changed) {
                try {
                  await document.atomicPatch(formValues)
                } catch (err) {
                  console.error(err)
                }
              } else {
                console.info('No document changed')
              }
            } else {
              const values = collection.newDocument(formValues)
              values.set(collection.schema.primaryPath, documentId)
              await values.save()
            }
          }
        }
        commit('reset')
      }
    },
    mutations: {
      setField: (
        state,
        {
          document,
          field,
          value
        }: { document: ContentsDocument; field: string; value: string }
      ) => {
        const collection = document.collection
        state.forms = immutable.set(
          state.forms,
          [collection.name, document.primary, field],
          castValue(document, field, value)
        )
      },
      resetField: (
        state,
        { document, field }: { document: ContentsDocument; field: string }
      ) => {
        const collection = document.collection
        state.forms = deletePath(state.forms, [
          collection.name,
          document.primary,
          field
        ])
      },
      reset: state => {
        state.forms = {}
      }
    },
    modules: {}
  })
}

// TODO move to utils
// * Delete the deep object key described in the path, and recursively delete empty object keys
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deletePath = (object: any, path: string[]): any => {
  const result = immutable.del(object, path.join('.'))
  path.pop()
  if (path.length && !Object.keys(immutable.get(result, path.join('.'))).length)
    return deletePath(object, path)
  else return result
}

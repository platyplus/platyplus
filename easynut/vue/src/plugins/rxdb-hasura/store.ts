import * as immutable from 'object-path-immutable'
import { RxDatabase, RxDocument } from 'rxdb'
import { Ref } from 'vue'
import { Store } from 'vuex'

import { castValue, debug, error, info } from './helpers'
import { GenericDocument, GenericRxDocument } from './types'
type State = {
  forms: Record<string, Record<string, GenericDocument | RxDocument>>
}
const state = (): State => ({
  forms: {}
})

export const addModule = <R>(
  db: Ref<RxDatabase | undefined>,
  store: Store<R>
): void => {
  store.registerModule('rxdb', {
    namespaced: true,
    state,
    getters: {
      form: state => state.forms,
      getField: state => (document: GenericRxDocument, field: string) => {
        if (document) {
          return (
            immutable.get(
              state.forms,
              `${document.collection.name}.${document.primary}.${field}`
            ) || document.get(field)
          )
        }
      }
    },
    actions: {
      save: async ({ state, commit }) => {
        debug('save', state.forms)
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
                debug('Document changed', document, formValues)
                try {
                  await document.atomicPatch(formValues)
                } catch (err) {
                  error(err)
                }
              } else {
                info('No document changed')
              }
            } else {
              debug('new document', formValues)
              const values = collection.newDocument(formValues)
              values.set(collection.schema.primaryPath, documentId)
              await values.save()
            }
          }
        }
        commit('reset')
        debug('save: end')
      }
    },
    mutations: {
      setField: (
        state,
        {
          document,
          field,
          value
        }: { document: GenericRxDocument; field: string; value: string }
      ) => {
        const collection = document.collection
        state.forms = immutable.set(
          state.forms,
          `${collection.name}.${document.primary}.${field}`,
          castValue(document, field, value)
        )
      },
      reset: state => {
        state.forms = {}
      }
    },
    modules: {}
  })
}

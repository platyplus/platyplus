import create from 'zustand'
import produce from 'immer'
import path from 'object-path'
import { devtools } from 'zustand/middleware'

import {
  CONFIG_COLLECTIONS,
  Contents,
  ContentsDocument
} from '@platyplus/rxdb-hasura'

const resetConfig = produce((state) => {
  CONFIG_COLLECTIONS.forEach((name) => (state[name] = {}))
})

export const useStore = create<{
  forms: Record<string, Record<string, Contents>>
  config: Record<string, Contents>
  getConfig: <T>(collection: string, id?: string, path?: string) => T
  setConfig: <T>(collection: string, id: string, document: T) => void
  setConfigForm: <T>(
    collection: string,
    values: T,
    id?: string,
    path?: string
  ) => void
  setForm: <T>(document: ContentsDocument, values: T, subPath?: string) => void
  resetForm: (document: ContentsDocument) => void
  clearConfig: () => void
}>(
  devtools((set, get) => ({
    forms: resetConfig({}),
    config: resetConfig({}),
    setConfig: (collection, id, value) =>
      set(
        produce((state) => {
          state.config[collection][id] = value
        })
      ),
    setConfigForm: (collection, value, givenId, path) =>
      set(
        produce((state) => {
          const id = givenId || value['id']
          if (!id) return
          if (path) {
            if (!state.forms[collection][id]) state.forms[collection][id] = {}
            state.forms[collection][id][path] = value
          } else {
            state.forms[collection][id] = value
          }
        })
      ),
    getConfig: (collection, id, path) => {
      const state = get()
      const config =
        (id
          ? state.config[collection][id]
          : Object.values(state.config[collection])[0]) || {}
      const formConfig =
        (id
          ? state.forms[collection][id]
          : Object.values(state.forms[collection])[0]) || {}
      if (path) return path in formConfig ? formConfig[path] : config[path]
      else return { ...config, ...formConfig }
    },
    setForm: (document, values, subPath?: string) =>
      set(
        produce((state) => {
          const fullPath = [
            document.collection.name,
            document.primary,
            ...(subPath ? [subPath] : [])
          ]
          path.set(state.forms, fullPath, values)
        })
      ),
    resetForm: (document) =>
      set(
        produce((state) => {
          path.del(state.forms, [document.collection.name, document.primary])
        })
      ),
    clearConfig: () =>
      set(
        produce((state) => {
          state.forms = resetConfig({})
        })
      )
  }))
)

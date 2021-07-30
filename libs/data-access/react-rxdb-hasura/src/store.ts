import create from 'zustand'
import produce from 'immer'
import path from 'object-path'
import { devtools } from 'zustand/middleware'

import {
  ConfigCollectionName,
  Contents,
  ContentsDocument
} from '@platyplus/rxdb-hasura'

type CollectionForm = Record<string, Contents>
type FormType = Record<string, CollectionForm> &
  Record<ConfigCollectionName, CollectionForm>

const resetConfig: (input) => FormType = produce((state) => {
  state.app_config = {}
  state.table_config = {}
  state.property_config = {}
})
export const useStore = create<{
  forms: FormType
  config: FormType
  // setConfig: <T>(collection: string, id: string, document: T) => void
  setConfigForm: <T>(
    collection: ConfigCollectionName,
    values: T,
    id?: string,
    path?: string
  ) => void
  setForm: <T>(document: ContentsDocument, values: T, subPath?: string) => void
  resetForm: (document: ContentsDocument) => void
  clearConfig: () => void
}>(
  devtools(
    (set, get) => ({
      forms: resetConfig({}),
      config: resetConfig({}),
      // setConfig: (collection, id, value) =>
      //   set(
      //     produce((state) => {
      //       state.config[collection][id] = value
      //     })
      //   ),
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
            state.forms = resetConfig(state.forms)
          })
        )
    }),
    'main'
  )
)

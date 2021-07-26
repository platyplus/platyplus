import create from 'zustand'
import produce from 'immer'
import path from 'object-path'

import {
  CONFIG_TABLES,
  Contents,
  ContentsDocument
} from '@platyplus/rxdb-hasura'

export const useFormStore = create<{
  forms: Record<string, Record<string, Contents>>
  setForm: (document: ContentsDocument, values: Record<string, unknown>) => void
  resetForm: (document: ContentsDocument) => void
  clearConfig: () => void
}>((set) => ({
  forms: {},
  setForm: (document, values) =>
    set(
      produce((state) => {
        path.set(
          state.forms,
          [document.collection.name, document.primary],
          values
        )
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
        CONFIG_TABLES.map((name) => `me_${name}`).forEach((name) =>
          path.del(state.forms, name)
        )
      })
    )
}))

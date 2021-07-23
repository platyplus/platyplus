import create from 'zustand'
import produce from 'immer'
import path from 'object-path'

import { castValue, Contents, ContentsDocument } from '@platyplus/rxdb-hasura'

export const useFormStore = create<{
  forms: Record<string, Record<string, Contents>>
  setForm: (
    document: ContentsDocument,
    values: Record<string, string | boolean>
  ) => void
  resetForm: (document: ContentsDocument) => void
}>((set) => ({
  forms: {},
  setForm: (document, values) =>
    set(
      produce((state) => {
        const newValues = Object.entries(values).reduce(
          (aggregator, [key, value]) => {
            const cast = castValue(document, key, value)
            aggregator[key] = cast
            return aggregator
          },
          {}
        )
        path.set(
          state.forms,
          [document.collection.name, document.primary],
          newValues
        )
      })
    ),
  resetForm: (document) =>
    set(
      produce((state) => {
        path.del(state.forms, [document.collection.name, document.primary])
      })
    )
}))

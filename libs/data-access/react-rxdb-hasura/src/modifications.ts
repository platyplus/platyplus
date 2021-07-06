import { castValue, Contents, ContentsDocument } from '@platyplus/rxdb-hasura'
import create from 'zustand'
import * as immutable from 'object-path-immutable'

const useFormStore = create<{
  forms: Record<string, Record<string, Contents>>
  setForm: (
    document: ContentsDocument,
    values: Record<string, string | boolean>
  ) => void
}>((set) => ({
  forms: {},
  setForm: (document, values) =>
    set((state) => {
      const newValues = Object.entries(values).reduce(
        (aggregator, [key, value]) => {
          aggregator[key] = castValue(document, key, value)
          return aggregator
        },
        {}
      )
      return immutable.set(
        state,
        ['forms', document.collection.name, document.primary],
        newValues
      )
    })
}))

export const useGetForm = <T extends Record<string, unknown>>(
  document: ContentsDocument
) =>
  useFormStore<T>((state) => {
    if (!document) return {}
    const properties = [...document.collection.properties.keys()]
    const form =
      state.forms?.[document.collection.name]?.[document.primary] || {}
    return properties.reduce((aggregator, key) => {
      const value = form[key] !== undefined ? form[key] : document[key]
      // TODO ugly
      if (Array.isArray(value)) aggregator[key] = JSON.stringify(value)
      else aggregator[key] = value ?? ''
      return aggregator
    }, {})
  })

export const useSetForm = () => useFormStore((state) => state.setForm)

import create from 'zustand'
import * as immutable from 'object-path-immutable'
import deepEqual from 'deep-equal'

import { castValue, Contents, ContentsDocument } from '@platyplus/rxdb-hasura'

const useFormStore = create<{
  forms: Record<string, Record<string, Contents>>
  setForm: (
    document: ContentsDocument,
    values: Record<string, string | boolean>
  ) => void
  resetForm: (document: ContentsDocument) => void
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
    }),
  resetForm: (document) =>
    set((state) =>
      immutable.del(state, [
        'forms',
        document.collection.name,
        document.primary
      ])
    )
}))

/**
 * Get the form values of a given document
 * @param document
 * @returns
 */
const useFormValues = (document?: ContentsDocument) =>
  useFormStore(
    (state) =>
      (document && state.forms[document.collection.name]?.[document.primary]) ||
      {}
  )

/**
 * Get the values of every property of the form,
 * and fall back to the value of the document if not yet present in the form
 * @param document
 * @returns
 */
export const useGetForm = <T extends Record<string, unknown>>(
  document: ContentsDocument
) => {
  const form = useFormValues(document)
  return useFormStore<T>((state) => {
    if (!document) return {}
    return [...document.collection.properties.keys()].reduce(
      (aggregator, key) => {
        aggregator[key] =
          (form[key] !== undefined ? form[key] : document[key]) ?? null
        return aggregator
      },
      {}
    )
  })
}

export const useSetForm = (document: ContentsDocument) =>
  useFormStore(
    (state) => (values: Record<string, string | boolean>) =>
      state.setForm(document, values)
  )

/**
 * Resets the form linked to the given document
 * @param document
 * @returns
 */
export const useResetForm = (document: ContentsDocument) =>
  useFormStore((state) => () => state.resetForm(document))

/**
 * Tracks changes in the form linked to the given document
 * @param document
 * @returns
 */
export const useFormChanged = (document?: ContentsDocument) => {
  const formValues = useFormValues(document)
  return (
    document &&
    [...document.collection.properties.keys()].some(
      (key) =>
        formValues[key] !== undefined &&
        (typeof document[key] === 'object'
          ? !deepEqual(document[key], formValues[key])
          : document[key] !== formValues[key])
    )
  )
}

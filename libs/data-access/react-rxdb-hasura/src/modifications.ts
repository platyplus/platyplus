import create from 'zustand'
import * as immutable from 'object-path-immutable'
import deepEqual from 'deep-equal'

import { castValue, Contents, ContentsDocument } from '@platyplus/rxdb-hasura'
import { useDocumentProperties } from './metadata'

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
export const useGetForm = (document: ContentsDocument) => {
  const form = useFormValues(document)
  const [properties] = useDocumentProperties(document)
  // ? subscribe to document changes as well?
  return useFormStore<Contents>((state) => {
    if (!properties) return {} as Contents
    return [...properties.keys(), document.primaryPath].reduce(
      (aggregator, key) => {
        aggregator[key] =
          (form[key] !== undefined ? form[key] : document[key]) ?? null
        return aggregator
      },
      {} as Contents
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
  const [properties] = useDocumentProperties(document)
  return (
    properties &&
    [...properties.keys()].some((key) => {
      if (formValues[key] === undefined) {
        return false
      } else {
        if (!document[key] && !formValues[key]) return false
        else
          return typeof document[key] === 'object'
            ? !deepEqual(document[key], formValues[key])
            : document[key] !== formValues[key]
      }
    })
  )
}

export const useFormSave = (document?: ContentsDocument) => {
  const changed = useFormChanged(document)
  const formValues = useFormValues(document)
  const reset = useResetForm(document)
  return async () => {
    if (changed) {
      await document.atomicPatch(formValues)
      reset()
    }
  }
}

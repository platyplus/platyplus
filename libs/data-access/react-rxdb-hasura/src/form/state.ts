import { useCallback, useMemo, useState } from 'react'
import { Schema } from 'schema-typed'
import deepEqual from 'deep-equal'
import { useAsync } from 'react-use'

import { Contents, ContentsDocument } from '@platyplus/rxdb-hasura'
import { useDocumentProperties } from '../metadata'
import { useFormStore } from './store'
import { useFormModel } from './model'

/**
 * Get the form values of a given document
 * @param document
 * @returns
 */
export const useFormValues = (document?: ContentsDocument): Contents =>
  useFormStore(
    useCallback(
      (state) =>
        (document &&
          state.forms[document.collection.name]?.[document.primary]) ||
        ({} as Contents),
      [document]
    )
  )

/**
 * Get the values of every property of the form,
 * and fall back to the value of the document if not yet present in the form
 * @param document
 * @returns
 */
export const useForm = (
  document: ContentsDocument
): {
  form: Contents
  setForm: (val: Contents) => void
  model: Schema
  isValid: boolean
  hasChanged: boolean
  canSave: boolean
  reset: () => void
  save: () => Promise<void>
} => {
  const formValues = useFormValues(document)
  const [properties] = useDocumentProperties(document)

  const form = useMemo(() => {
    if (!properties) return {} as Contents
    return [...properties.keys(), document.primaryPath].reduce(
      (aggregator, key) => {
        aggregator[key] = key in formValues ? formValues[key] : document[key]
        return aggregator
      },
      {} as Contents
    )
  }, [document, formValues, properties])

  const setForm = useFormStore(
    (state) => (values: Record<string, string | boolean>) =>
      state.setForm(document, values),
    // TODO remove?? -> see zustand documentation, but I don't get why this hook should trigger a re-render
    () => true
  )

  const hasChanged = useMemo(
    () =>
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
      }),
    [document, formValues, properties]
  )
  const model = useFormModel(document)

  const [isValid, setValid] = useState(false)
  useAsync(async () => {
    const check = await model.checkAsync(form)
    setValid(Object.values(check).every((value) => !value.hasError))
  }, [model, form])

  const save = async () => {
    if (canSave) {
      await document.atomicPatch({ is_local_change: false, ...formValues })
      reset()
    }
  }
  const canSave = useMemo(() => hasChanged && isValid, [hasChanged, isValid])

  const reset = useFormStore(
    useCallback((state) => () => state.resetForm(document), [document])
  )

  return { form, setForm, model, isValid, hasChanged, canSave, save, reset }
}

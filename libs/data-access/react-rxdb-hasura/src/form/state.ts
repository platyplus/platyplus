import { useCallback, useMemo } from 'react'
import { Schema } from 'schema-typed'

import { Contents, ContentsDocument } from '@platyplus/rxdb-hasura'
import { useDocumentProperties } from '../metadata'
import { useFormStore } from './store'
import { useFormModel } from './model'
import { useFormSave, useFormReset } from './actions'
import { useFormHasChanged } from './changes'
import { useFormIsValid, useFormCanSave } from './validation'

/**
 * Get the form values of a given document
 * @param document
 * @returns
 */
export const useFormRawValues = (document?: ContentsDocument): Contents =>
  useFormStore(
    useCallback(
      (state) =>
        (document &&
          state.forms[document.collection.name]?.[document.primary]) ||
        ({} as Contents),
      [document]
    )
  )

export const useFormGet = (document: ContentsDocument) => {
  const [properties] = useDocumentProperties(document)
  const formValues = useFormRawValues(document)
  return useMemo(() => {
    if (!properties) return {} as Contents
    return [...properties.keys(), document.primaryPath].reduce(
      (aggregator, key) => {
        aggregator[key] = key in formValues ? formValues[key] : document[key]
        return aggregator
      },
      {} as Contents
    )
  }, [document, formValues, properties])
}

export const useFormSet = (document: ContentsDocument) =>
  useFormStore(
    (state) => (values: Record<string, string | boolean>) =>
      state.setForm(document, values)
  )

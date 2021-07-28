import { useCallback, useMemo } from 'react'

import { Contents, ContentsDocument } from '@platyplus/rxdb-hasura'

import { useDocumentProperties } from '../property'
import { useStore } from '../store'
import { useWatchDocumentValue } from '../document'

/**
 * Get the form values of a given document
 * @param document
 * @returns
 */
export const useFormRawValues = (document?: ContentsDocument): Contents =>
  useStore(
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
  const documentValues = useWatchDocumentValue(document)

  return useMemo(() => {
    if (!properties) return {} as Contents
    return [...properties.keys(), document.primaryPath].reduce(
      (aggregator, key) => {
        aggregator[key] =
          key in formValues ? formValues[key] : documentValues?.[key]
        return aggregator
      },
      {} as Contents
    )
  }, [document, documentValues, formValues, properties])
}

export const useFormSet = (document: ContentsDocument) =>
  useStore(
    (state) => (values: Record<string, unknown>) =>
      state.setForm(document, values)
  )

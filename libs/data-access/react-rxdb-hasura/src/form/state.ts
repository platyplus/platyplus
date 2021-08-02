import { useCallback, useMemo } from 'react'

import { Contents, ContentsDocument, Metadata } from '@platyplus/rxdb-hasura'

import { useMetadataProperties } from '../property'
import { useStore } from '../store'
import { useCollectionName } from '../collection'

/**
 * Get the form values of a given document
 * @param document
 * @returns
 */
export const useFormRawValues = (
  metadata: Metadata,
  role: string,
  document: ContentsDocument
): Contents => {
  const collectionName = useCollectionName(metadata, role)
  return useStore(
    useCallback(
      (state) =>
        (document && state.forms[collectionName]?.[document.id]) ||
        ({} as Contents),
      [document, collectionName]
    )
  )
}

export const useFormGet = (
  metadata: Metadata,
  role: string,
  document: ContentsDocument
) => {
  const [properties] = useMetadataProperties(metadata)
  const formValues = useFormRawValues(metadata, role, document)

  return useMemo(() => {
    if (!properties) return {} as Contents
    return [...properties.keys(), 'id'].reduce(
      // ? custom id
      (aggregator, key) => {
        aggregator[key] = key in formValues ? formValues[key] : document?.[key]
        return aggregator
      },
      {} as Contents
    )
  }, [document, formValues, properties])
}

export const useFormSet = (
  metadata: Metadata,
  role: string,
  document: Contents
) => {
  const collectionName = useCollectionName(metadata, role)
  return useStore(
    (state) => (values: Record<string, unknown>) =>
      state.setForm(collectionName, document, values)
  )
}

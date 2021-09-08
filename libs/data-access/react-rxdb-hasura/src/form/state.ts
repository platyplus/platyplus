import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  Contents,
  ContentsDocument,
  ID_COLUMN,
  TableInformation
} from '@platyplus/rxdb-hasura'

import { useStore } from '../store'
import { useCollectionName } from '../collection'
import { useTableProperties } from '../property'

/**
 * Get the form values of a given document
 * @param document
 * @returns
 */
export const useFormRawValues = (
  tableInfo: TableInformation,
  role: string,
  document: Contents
): Contents => {
  const collectionName = useCollectionName(tableInfo, role)
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
  tableInfo: TableInformation,
  role: string,
  document: ContentsDocument
) => {
  const [properties] = useTableProperties(tableInfo)
  const formValues = useFormRawValues(tableInfo, role, document)
  const [docValues, setDocValues] = useState(null)
  useEffect(() => {
    if (document) {
      const subscription = document.$.subscribe((values) =>
        setDocValues(values)
      )
      return () => subscription.unsubscribe()
    }
  }, [document])
  return useMemo(() => {
    if (!properties) return {} as Contents
    return [...properties.keys(), ID_COLUMN].reduce(
      // ? custom id
      (aggregator, key) => {
        aggregator[key] = key in formValues ? formValues[key] : docValues?.[key]
        return aggregator
      },
      {} as Contents
    )
  }, [docValues, formValues, properties])
}

export const useFormSet = (
  tableInfo: TableInformation,
  role: string,
  document: Contents
) => {
  const collectionName = useCollectionName(tableInfo, role)
  return useStore(
    (state) => (values: Record<string, unknown>) =>
      state.setForm(collectionName, document, values)
  )
}

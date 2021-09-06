import { ContentsDocument, TableInformation } from '@platyplus/rxdb-hasura'
import { useCallback } from 'react'

import { useStore } from '../store'
import { useFormCanSave } from './validation'
import { useFormRawValues } from './state'
import { useCollectionName } from '../collection'

export const useFormSave = (
  tableInfo: TableInformation,
  role: string,
  document: ContentsDocument
) => {
  const canSave = useFormCanSave(tableInfo, role, document)
  const formValues = useFormRawValues(tableInfo, role, document)
  const reset = useFormReset(tableInfo, role, document)
  return useCallback(async () => {
    if (canSave) {
      await document.atomicPatch({ is_local_change: false, ...formValues })
      reset()
    }
  }, [canSave, document, formValues, reset])
}

export const useFormReset = (
  tableInfo: TableInformation,
  role: string,
  document: ContentsDocument
) => {
  const collectionName = useCollectionName(tableInfo, role)
  return useStore((state) => () => state.resetForm(collectionName, document))
}

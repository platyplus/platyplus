import { ContentsDocument, Metadata } from '@platyplus/rxdb-hasura'
import { useCallback } from 'react'

import { useStore } from '../store'
import { useFormCanSave } from './validation'
import { useFormRawValues } from './state'
import { useCollectionName } from '../collection'

export const useFormSave = (
  metadata: Metadata,
  role: string,
  document: ContentsDocument
) => {
  const canSave = useFormCanSave(metadata, role, document)
  const formValues = useFormRawValues(metadata, role, document)
  const reset = useFormReset(metadata, role, document)
  return useCallback(async () => {
    if (canSave) {
      await document.atomicPatch({ is_local_change: false, ...formValues })
      reset()
    }
  }, [canSave, document, formValues, reset])
}

export const useFormReset = (
  metadata: Metadata,
  role: string,
  document: ContentsDocument
) => {
  const collectionName = useCollectionName(metadata, role)
  return useStore((state) => () => state.resetForm(collectionName, document))
}

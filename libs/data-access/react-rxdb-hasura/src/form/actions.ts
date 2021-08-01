import { Contents, Metadata } from '@platyplus/rxdb-hasura'
import { useCallback } from 'react'

import { useStore } from '../store'
import { useFormCanSave } from './validation'
import { useFormRawValues } from './state'
import { useCollectionName, useContentsCollection } from '../collection'

export const useFormSave = (
  metadata: Metadata,
  role: string,
  document: Contents
) => {
  const canSave = useFormCanSave(metadata, role, document)
  const formValues = useFormRawValues(metadata, role, document)
  const reset = useFormReset(metadata, role, document)
  const collectionName = useCollectionName(metadata, role)
  const collection = useContentsCollection(collectionName)
  return useCallback(async () => {
    if (canSave) {
      await collection.atomicUpsert({ is_local_change: false, ...formValues })
      reset()
    }
  }, [canSave, collection, formValues, reset])
}

export const useFormReset = (
  metadata: Metadata,
  role: string,
  document: Contents
) => {
  const collectionName = useCollectionName(metadata, role)
  return useStore((state) => () => state.resetForm(collectionName, document))
}

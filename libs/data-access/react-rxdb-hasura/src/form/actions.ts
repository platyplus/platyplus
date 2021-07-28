import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { useCallback } from 'react'

import { useStore } from '../store'
import { useFormCanSave } from './validation'
import { useFormRawValues } from './state'

export const useFormSave = (document: ContentsDocument) => {
  const canSave = useFormCanSave(document)
  const formValues = useFormRawValues(document)
  const reset = useFormReset(document)
  return useCallback(async () => {
    if (canSave) {
      await document.atomicPatch({ is_local_change: false, ...formValues })
      reset()
    }
  }, [canSave, document, formValues, reset])
}

export const useFormReset = (document: ContentsDocument) =>
  useStore((state) => () => state.resetForm(document))

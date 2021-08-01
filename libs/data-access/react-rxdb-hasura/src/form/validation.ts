import { Contents, Metadata } from '@platyplus/rxdb-hasura'
import { useState, useEffect, useMemo } from 'react'
import { useFormGet } from './state'
import { useFormHasChanged } from './changes'
import { useFormModel } from './model'

export const useFormIsValid = (
  metadata: Metadata,
  role: string,
  document: Contents
) => {
  const [isValid, setValid] = useState(false)
  const model = useFormModel(metadata)
  const form = useFormGet(metadata, role, document)
  useEffect(() => {
    model.checkAsync(form).then((check) => {
      setValid(Object.values(check).every((value) => !value.hasError))
    })
  }, [model, form])
  return isValid
}

export const useFormCanSave = (
  metadata: Metadata,
  role: string,
  document: Contents
) => {
  const hasChanged = useFormHasChanged(metadata, role, document)
  const isValid = useFormIsValid(metadata, role, document)
  return useMemo(() => hasChanged && isValid, [hasChanged, isValid])
}

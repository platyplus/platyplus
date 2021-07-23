import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { useState, useEffect, useMemo } from 'react'
import { useFormGet } from './state'
import { useFormHasChanged } from './changes'
import { useFormModel } from './model'

export const useFormIsValid = (document: ContentsDocument) => {
  const [isValid, setValid] = useState(false)
  const model = useFormModel(document)
  const form = useFormGet(document)
  useEffect(() => {
    model.checkAsync(form).then((check) => {
      setValid(Object.values(check).every((value) => !value.hasError))
    })
  }, [model, form])
  return isValid
}

export const useFormCanSave = (document: ContentsDocument) => {
  const hasChanged = useFormHasChanged(document)
  const isValid = useFormIsValid(document)
  return useMemo(() => hasChanged && isValid, [hasChanged, isValid])
}

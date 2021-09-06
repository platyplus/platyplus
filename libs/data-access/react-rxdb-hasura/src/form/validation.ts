import { ContentsDocument, TableInformation } from '@platyplus/rxdb-hasura'
import { useState, useEffect, useMemo } from 'react'
import { useFormGet } from './state'
import { useFormHasChanged } from './changes'
import { useFormModel } from './model'

export const useFormIsValid = (
  tableInfo: TableInformation,
  role: string,
  document: ContentsDocument
) => {
  const [isValid, setValid] = useState(false)
  const model = useFormModel(tableInfo)
  const form = useFormGet(tableInfo, role, document)
  useEffect(() => {
    model.checkAsync(form).then((check) => {
      setValid(Object.values(check).every((value) => !value.hasError))
    })
  }, [model, form])
  return isValid
}

export const useFormCanSave = (
  tableInfo: TableInformation,
  role: string,
  document: ContentsDocument
) => {
  const hasChanged = useFormHasChanged(tableInfo, role, document)
  const isValid = useFormIsValid(tableInfo, role, document)
  return useMemo(() => hasChanged && isValid, [hasChanged, isValid])
}

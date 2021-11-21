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
  const form = useFormGet(tableInfo, role, document)
  const model = useFormModel(tableInfo, role, form, document._isTemporary)
  useEffect(() => {
    // ? Use Suspense instead ?
    const go = async () => {
      if (model) {
        const check = await model.checkAsync(form)
        setValid(Object.values(check).every((value) => !value.hasError))
      }
    }
    go()
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

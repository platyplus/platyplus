import { useMemo } from 'react'

import { Contents, createModel, TableInformation } from '@platyplus/rxdb-hasura'
import { useDB } from '..'

export const useFormModel = (
  tableInfo: TableInformation,
  role: string,
  form: Contents,
  isNew: boolean
) => {
  const db = useDB()
  return useMemo(
    () => createModel(db, tableInfo, role, form, isNew),
    [db, tableInfo, role, form, isNew]
  )
}

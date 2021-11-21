import { useState, useEffect } from 'react'

import { Contents, createModel, TableInformation } from '@platyplus/rxdb-hasura'
import { useDB } from '..'
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T

export const useFormModel = (
  tableInfo: TableInformation,
  role: string,
  form: Contents,
  isNew: boolean
) => {
  const db = useDB()
  const [model, setModel] = useState<Awaited<ReturnType<typeof createModel>>>()
  useEffect(() => {
    const go = async () => {
      setModel(await createModel(db, tableInfo, role, form, isNew))
    }
    go()
  }, [db, tableInfo, role, form, isNew])
  return model
}

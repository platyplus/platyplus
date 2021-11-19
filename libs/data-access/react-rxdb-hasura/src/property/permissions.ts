import { useEffect, useState } from 'react'

import {
  ContentsDocument,
  canEdit,
  TableInformation,
  canRead
} from '@platyplus/rxdb-hasura'

export const usePropertyPermissions = (
  tableInfo: TableInformation,
  role: string,
  propertyName: string,
  document?: ContentsDocument
) => {
  const [edit, setEdit] = useState(false)
  const [read, setRead] = useState(false)
  useEffect(() => {
    if (document) {
      const subscription = document.$.subscribe((value) => {
        setEdit(canEdit(tableInfo, role, value, propertyName, false))
        setRead(canRead(tableInfo, role, propertyName))
      })
      return () => subscription.unsubscribe()
    } else {
      setEdit(canEdit(tableInfo, role, document, propertyName, true))
      setRead(canRead(tableInfo, role, propertyName))
    }
  }, [document, tableInfo, role, propertyName])
  return { edit, read }
}

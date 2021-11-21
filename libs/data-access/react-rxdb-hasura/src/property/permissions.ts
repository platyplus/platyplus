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
      const subscription = document.$.subscribe(async (value) => {
        setEdit(
          await canEdit(
            tableInfo,
            role,
            value,
            propertyName,
            document._isTemporary
          )
        )
        setRead(canRead(tableInfo, role, propertyName))
      })
      return () => subscription.unsubscribe()
    }
  }, [document, tableInfo, role, propertyName])
  return { edit, read }
}

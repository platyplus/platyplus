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
    setEdit(canEdit(tableInfo, role, document, propertyName))
    setRead(canRead(tableInfo, role, propertyName))
  }, [document, tableInfo, role, propertyName])
  return { edit, read }
}

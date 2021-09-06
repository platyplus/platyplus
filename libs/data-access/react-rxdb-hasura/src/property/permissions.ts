import { useEffect, useState } from 'react'

import {
  ContentsDocument,
  canEdit,
  TableInformation
} from '@platyplus/rxdb-hasura'

export const usePropertyPermissions = (
  tableInfo: TableInformation,
  role: string,
  propertyName: string,
  document?: ContentsDocument
) => {
  const [edit, setEdit] = useState(false)
  useEffect(() => {
    setEdit(canEdit(tableInfo, role, document, propertyName))
  }, [document, tableInfo, role, propertyName])
  return { edit }
}

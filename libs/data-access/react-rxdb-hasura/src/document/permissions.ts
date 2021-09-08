import { useEffect, useState } from 'react'

import {
  ContentsDocument,
  canEdit,
  canRemove,
  TableInformation,
  canSave
} from '@platyplus/rxdb-hasura'

export const useDocumentPermissions = (
  tableInfo: TableInformation,
  role: string,
  document?: ContentsDocument
) => {
  const [edit, setEdit] = useState(false)
  const [remove, setRemove] = useState(false)
  const [save, setSave] = useState(false)
  useEffect(() => {
    setEdit(canEdit(tableInfo, role, document))
    setRemove(canRemove(tableInfo, role, document))
    setSave(canSave(tableInfo, role, document))
  }, [document, tableInfo, role])
  return { edit, remove, save }
}

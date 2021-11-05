import { useEffect, useState } from 'react'

import {
  ContentsDocument,
  canEdit,
  canRemove,
  TableInformation,
  canSave
} from '@platyplus/rxdb-hasura'
import { useFormGet } from '../form'

export const useDocumentPermissions = (
  tableInfo: TableInformation,
  role: string,
  document?: ContentsDocument
) => {
  const [edit, setEdit] = useState(false)
  const [remove, setRemove] = useState(false)
  const [save, setSave] = useState(false)
  const form = useFormGet(tableInfo, role, document)
  useEffect(() => {
    console.log('EFFECT on PERMISSIONS')
    setSave(canSave(tableInfo, role, form))
  }, [tableInfo, role, form])
  useEffect(() => {
    setEdit(canEdit(tableInfo, role, document))
    setRemove(canRemove(tableInfo, role, document))
  }, [document, tableInfo, role])
  return { edit, remove, save }
}

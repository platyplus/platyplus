import { useEffect, useState } from 'react'

import {
  ContentsDocument,
  canEdit,
  canRemove,
  TableInformation
} from '@platyplus/rxdb-hasura'
import { useFormGet, useFormModel } from '../form'

export const useDocumentPermissions = (
  tableInfo: TableInformation,
  role: string,
  document?: ContentsDocument
) => {
  const [edit, setEdit] = useState(false)
  const [remove, setRemove] = useState(false)
  const [save, setSave] = useState(false)
  const form = useFormGet(tableInfo, role, document)
  const model = useFormModel(tableInfo, role, form, document._isTemporary)
  useEffect(() => {
    const check = async () => {
      if (model) {
        const checkResult = await model.checkAsync(form)
        const ok = !Object.values(checkResult).some((v) => v.hasError)
        setSave(ok)
      }
    }
    check()
  }, [form, model])
  useEffect(() => {
    // ? use Suspense instead ?
    const check = async () => {
      setEdit(await canEdit(tableInfo, role, document))
      setRemove(await canRemove(tableInfo, role, document))
    }
    check()
  }, [document, tableInfo, role])
  return { edit, remove, save }
}

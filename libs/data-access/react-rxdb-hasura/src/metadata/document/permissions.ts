import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { useEffect, useState } from 'react'
import { useDocumentMetadata } from './hooks'

export const useDocumentPermissions = (document?: ContentsDocument) => {
  const [canEdit, setEdit] = useState(false)
  const [canDelete, setDelete] = useState(false)
  const metadata = useDocumentMetadata(document)
  // TODO implement canSave
  useEffect(() => {
    if (document) {
      setEdit(document.canEdit())
      setDelete(document.canDelete())
    }
  }, [document, metadata])
  return { canEdit, canDelete }
}

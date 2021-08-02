import { useEffect, useState } from 'react'

import {
  ContentsDocument,
  canEdit,
  canDelete,
  Metadata
} from '@platyplus/rxdb-hasura'

export const useDocumentPermissions = (
  metadata: Metadata,
  role: string,
  document?: ContentsDocument
) => {
  const [edit, setEdit] = useState(false)
  const [remove, setRemove] = useState(false)
  // TODO implement canSave
  useEffect(() => {
    if (document) {
      setEdit(canEdit(metadata, role, document))
      setRemove(canDelete(metadata, role, document))
    }
  }, [document, metadata, role])
  return { edit, remove }
}

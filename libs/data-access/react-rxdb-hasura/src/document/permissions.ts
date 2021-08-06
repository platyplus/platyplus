import { useEffect, useState } from 'react'

import {
  ContentsDocument,
  canEdit,
  canRemove,
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
      setRemove(canRemove(metadata, role, document))
    }
  }, [document, metadata, role])
  return { edit, remove }
}

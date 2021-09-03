import { useEffect, useState } from 'react'

import { ContentsDocument, canEdit, Metadata } from '@platyplus/rxdb-hasura'

export const usePropertyPermissions = (
  metadata: Metadata,
  role: string,
  propertyName: string,
  document?: ContentsDocument
) => {
  const [edit, setEdit] = useState(false)
  useEffect(() => {
    setEdit(canEdit(metadata, role, document, propertyName))
  }, [document, metadata, role, propertyName])
  return { edit }
}

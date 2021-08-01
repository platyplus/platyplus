import { useEffect, useState } from 'react'

import { canCreate, Metadata } from '@platyplus/rxdb-hasura'

export const useCollectionPermissions = (metadata: Metadata, role: string) => {
  const [create, setCreate] = useState(false)
  useEffect(() => {
    setCreate(canCreate(metadata, role))
  }, [role, metadata])
  return { create }
}

import { useEffect, useState } from 'react'

import { ContentsCollection, canCreate } from '@platyplus/rxdb-hasura'

import { useCollectionMetadata } from './metadata'

export const useCollectionPermissions = (collection?: ContentsCollection) => {
  const [create, setCreate] = useState(false)
  const metadata = useCollectionMetadata(collection)
  useEffect(() => {
    if (collection) {
      setCreate(canCreate(collection))
    }
  }, [collection, metadata])
  return { create }
}

import { ContentsCollection } from '@platyplus/rxdb-hasura'
import { useEffect, useState } from 'react'
import { useCollectionMetadata } from './hooks'

export const useCollectionPermissions = (collection?: ContentsCollection) => {
  const [canCreate, setCreate] = useState(false)
  const metadata = useCollectionMetadata(collection)
  useEffect(() => {
    if (collection) {
      setCreate(collection.canInsert())
    }
  }, [collection, metadata])
  return { canCreate }
}

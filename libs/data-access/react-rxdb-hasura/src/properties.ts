import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { useEffect, useState } from 'react'
import { useCollectionMetadata } from './metadata'

export const useCollectionProperties = (collection: ContentsCollection) => {
  const metadata = useCollectionMetadata(collection)
  const [properties, setProperties] = useState(collection.properties)
  useEffect(() => {
    setProperties(collection.properties)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata])
  return properties
}

export const useDocumentProperties = (document: ContentsDocument) =>
  useCollectionProperties(document.collection as ContentsCollection)

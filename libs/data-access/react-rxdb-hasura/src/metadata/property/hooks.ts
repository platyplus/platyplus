import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { useEffect, useState } from 'react'
import { RxCollection } from 'rxdb'
import { useCollectionMetadata } from '../collection'

export const useCollectionProperties = (collection: ContentsCollection) => {
  const metadata = useCollectionMetadata(collection)
  const [properties, setProperties] = useState(collection?.properties)
  useEffect(() => {
    collection && setProperties(collection.properties)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata])
  return properties
}

export const useDocumentProperties = (document?: ContentsDocument) =>
  useCollectionProperties(document?.collection as ContentsCollection)

export const useCollectionPropertyConfig = (
  collection: RxCollection,
  property: string
) => {
  const metadata = useCollectionMetadata(collection)
  return metadata?.propertiesConfig?.[property]
}
export const useDocumentPropertyConfig = (
  document: ContentsDocument,
  property: string
) =>
  useCollectionPropertyConfig(
    document.collection as ContentsCollection,
    property
  )

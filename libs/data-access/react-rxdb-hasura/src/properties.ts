import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { useEffect, useState } from 'react'
import { useCollectionMetadata } from './metadata'

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
  collection: ContentsCollection,
  property: string
) => {
  const metadata = useCollectionMetadata(collection)
  return metadata?.propertiesConfig.find(
    ({ property_name }) => property_name === property
  )
}
export const useDocumentPropertyConfig = (
  document: ContentsDocument,
  property: string
) =>
  useCollectionPropertyConfig(
    document.collection as ContentsCollection,
    property
  )

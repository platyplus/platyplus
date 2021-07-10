import {
  ContentsCollection,
  ContentsDocument,
  Metadata
} from '@platyplus/rxdb-hasura'
import { useState, useEffect } from 'react'
import { RxCollection } from 'rxdb'

export const useCollectionMetadata = (
  collection?: RxCollection
): Readonly<Metadata | null> => {
  const [result, setResult] = useState<Metadata>(null)
  useEffect(() => {
    if (collection?.metadata) {
      const subscription = collection.metadata.$.subscribe(
        (value: Metadata) => {
          setResult(value)
        }
      )
      return () => subscription.unsubscribe()
    }
  }, [collection])
  return result
}

export const useDocumentMetadata = (
  document?: ContentsDocument
): Readonly<Metadata | undefined> =>
  useCollectionMetadata(document?.collection as ContentsCollection)

/*
  
  export const useDocumentMetadataConfig = (
    document: ContentsDocument,
    property?: string
  ) =>
    useCollectionMetadataConfig(
      document.collection as ContentsCollection,
      property
    )
  */

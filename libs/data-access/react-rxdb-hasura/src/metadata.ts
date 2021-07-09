import {
  ContentsCollection,
  ContentsDocument,
  Metadata
} from '@platyplus/rxdb-hasura'
import { useState, useEffect } from 'react'

export const useCollectionMetadata = (
  collection?: ContentsCollection
): Readonly<Metadata | null> => {
  const [result, setResult] = useState<Metadata>(null)
  useEffect(() => {
    if (collection) {
      const subscription = collection.metadata.$.subscribe((value) =>
        setResult(value)
      )

      return () => subscription.unsubscribe()
    }
  }, [collection])
  return result
}

export const useDocumentMetadata = (
  document?: ContentsDocument
): Readonly<Metadata | undefined> =>
  useCollectionMetadata(document.collection as ContentsCollection)

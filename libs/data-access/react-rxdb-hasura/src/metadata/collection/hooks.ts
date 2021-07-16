import { ContentsCollection, Metadata } from '@platyplus/rxdb-hasura'
import { useState, useEffect } from 'react'

export const useCollectionMetadata = (
  collection?: ContentsCollection
): Readonly<Metadata | null> => {
  const [result, setResult] = useState<Metadata>()
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

export const useCollectionComponentName = (collection: ContentsCollection) => {
  const metadata = useCollectionMetadata(collection)
  const [componentName, setComponentName] = useState(collection?.component())
  useEffect(() => {
    collection && setComponentName(collection.component())
  }, [collection, metadata])
  return componentName
}
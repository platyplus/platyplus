import { ContentsCollection, Metadata } from '@platyplus/rxdb-hasura'
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

export const useCollectionComponentName = (collection: ContentsCollection) => {
  const metadata = useCollectionMetadata(collection)
  const [componentName, setComponentName] = useState(collection?.component())
  useEffect(() => {
    collection && setComponentName(collection.component())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata])
  return componentName
}

import { useState, useEffect, useCallback } from 'react'
import { useRxData } from 'rxdb-hooks'

import { ContentsCollection, Metadata } from '@platyplus/rxdb-hasura'

export const useMetadataCollection = (role: string) => {
  const queryConstructor = useCallback((collection) => collection.find(), [])
  const data = useRxData<Metadata>(`${role}_metadata`, queryConstructor)
  return data
}

export const useCollectionMetadata = (
  collection?: ContentsCollection
): Readonly<Metadata | null> => {
  const [result, setResult] = useState<Metadata>(collection?.metadata)
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

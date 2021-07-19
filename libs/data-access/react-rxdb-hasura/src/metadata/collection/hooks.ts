import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRxData } from 'rxdb-hooks'
import { Contents, ContentsCollection, Metadata } from '@platyplus/rxdb-hasura'
import { RxCollection } from 'rxdb'

export const useMetadataCollection = (role: string) => {
  const queryConstructor = useCallback((collection) => collection.find(), [])
  const data = useRxData<Metadata>(`${role}_metadata`, queryConstructor)
  return data
}

export const useMetadataDocument = (role: string, id: string) => {
  const queryConstructor = useCallback(
    (collection) => collection.findOne(id),
    [id]
  )

  const { isFetching, result } = useRxData<Metadata>(
    `${role}_metadata`,
    queryConstructor
  )

  const document = useMemo(() => result[0], [result])
  return { isFetching, document }
}

export const useCollectionMetadata = (
  collection?: ContentsCollection | RxCollection<Contents>
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

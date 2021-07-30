import { useCallback } from 'react'
import { useRxData } from 'rxdb-hooks'

import { ContentsCollection, Metadata } from '@platyplus/rxdb-hasura'

import { useMetadataStore } from '../metadata'

export const useMetadataCollection = (role: string) => {
  const queryConstructor = useCallback((collection) => collection.find(), [])
  const data = useRxData<Metadata>(`${role}_metadata`, queryConstructor)
  return data
}

export const useCollectionMetadata = (
  collection?: ContentsCollection
): Readonly<Metadata | null> =>
  useMetadataStore(
    useCallback(
      (store) => collection && store.tables[collection._tableId],
      [collection]
    )
  )

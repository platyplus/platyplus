import { useCallback } from 'react'

import { ContentsCollection, Metadata } from '@platyplus/rxdb-hasura'

import { useMetadataStore } from '../metadata'

// TODO remove
export const useCollectionMetadata = (
  collection?: ContentsCollection
): Readonly<Metadata | null> =>
  useMetadataStore(
    useCallback(
      (store) => collection && store.tables[collection._tableId],
      [collection]
    )
  )

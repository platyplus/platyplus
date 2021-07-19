import { useCallback } from 'react'
import { RxCollection } from 'rxdb'

import { Contents, Metadata, MetadataDocument } from '@platyplus/rxdb-hasura'

import { useConfigStore } from './store'
import { useCollectionMetadata } from './collection/hooks'

type FallbackFunction<T> = (metadata?: Metadata) => T
export const useCollectionTableConfig = <T = Metadata['config']>(
  collection: RxCollection<Contents>,
  path?: string,
  fallback?: T | FallbackFunction<T>
): [T, (val: T) => void] => {
  const metadata = useCollectionMetadata(collection)
  return useTableConfig(metadata, path, fallback)
}

export const useTableConfig = <T = Metadata['config']>(
  metadata: MetadataDocument | Metadata,
  path?: string,
  fallback?: T | FallbackFunction<T>
): [T, (val: T) => void] => {
  const state = useConfigStore(
    useCallback(
      (state) =>
        metadata &&
        (state.getTable<T>(metadata, path) ||
          (typeof fallback === 'function'
            ? (fallback as FallbackFunction<T>)(metadata)
            : fallback)),
      [metadata, fallback, path]
    )
  )
  const setState = useConfigStore(
    (state) => (name: T) => state.setTable(metadata, name, path)
  )
  return [state, setState]
}

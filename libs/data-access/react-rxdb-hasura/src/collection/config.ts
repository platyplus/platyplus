import { ContentsCollection } from '@platyplus/rxdb-hasura'
import { useCollectionMetadata } from './metadata'
import { useTableConfig } from '../config'

export const useCollectionTableConfig = <T>(
  collection: ContentsCollection,
  path?: string,
  fallback?: T
): [T, (val: T) => void] => {
  const metadata = useCollectionMetadata(collection)
  return useTableConfig(metadata, path, fallback)
}

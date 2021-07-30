import { ContentsCollection } from '@platyplus/rxdb-hasura'
import { useCollectionMetadata } from './metadata'
import { useMetadataConfig } from '../config'

export const useCollectionTableConfig = <T>(
  collection: ContentsCollection,
  path?: string,
  fallback?: T
): [T, (val: T) => void] => {
  const metadata = useCollectionMetadata(collection)
  return useMetadataConfig(metadata?.id, path, fallback)
}

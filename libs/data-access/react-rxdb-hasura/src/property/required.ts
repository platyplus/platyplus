import { useMemo } from 'react'

import { ContentsCollection, isRequiredProperty } from '@platyplus/rxdb-hasura'
import { useCollectionMetadata } from '../collection'

export const useIsRequiredProperty = (
  collection: ContentsCollection,
  name: string
) => {
  const table = useCollectionMetadata(collection)
  return useMemo(() => table && isRequiredProperty(table, name), [table, name])
}

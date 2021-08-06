import { useMemo } from 'react'

import { collectionName, Metadata } from '@platyplus/rxdb-hasura'

export const useCollectionName = (metadata: Metadata, role: string) =>
  useMemo(() => metadata && collectionName(metadata, role), [metadata, role])

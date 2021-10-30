import { useMemo } from 'react'

import { collectionName, TableInformation } from '@platyplus/rxdb-hasura'

export const useCollectionName = (tableInfo: TableInformation, role: string) =>
  useMemo(() => tableInfo && collectionName(tableInfo, role), [tableInfo, role])

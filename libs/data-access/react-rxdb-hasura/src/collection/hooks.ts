import { useMemo } from 'react'

import {
  collectionName,
  ContentsCollection,
  TableInformation
} from '@platyplus/rxdb-hasura'
import { useRxCollection } from 'rxdb-hooks'

export const useCollectionName = (tableInfo: TableInformation, role: string) =>
  useMemo(() => tableInfo && collectionName(tableInfo, role), [tableInfo, role])

export const useContentsCollection = (
  tableInfo: TableInformation,
  role: string
) => {
  const collectionName = useCollectionName(tableInfo, role)
  const collection = useRxCollection(collectionName)
  return collection as ContentsCollection
}

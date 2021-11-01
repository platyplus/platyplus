import { useCallback, useMemo } from 'react'

import { TableInformation, TABLE_INFO_TABLE } from '@platyplus/rxdb-hasura'

import { useStore } from '../store'
import { useRxCollection, useRxQuery } from 'rxdb-hooks'

export const useTablesConfig = () => {
  const collection = useRxCollection(TABLE_INFO_TABLE)
  const q = useMemo(() => collection?.find(), [collection])
  const { result } = useRxQuery<TableInformation>(q)
  const modifiedTables = useStore(
    useCallback((state) => state.forms[TABLE_INFO_TABLE] || {}, [])
  )
  const tables = useMemo(
    () =>
      result.map((t) => {
        const modifiedPage = modifiedTables[t.id]
        if (modifiedPage) return { ...t, ...modifiedPage }
        else return t
      }),
    [result, modifiedTables]
  )
  return tables
}

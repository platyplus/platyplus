import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRxDocument } from 'rxdb-hooks'

import {
  isManyToManyJoinTable,
  TableInformation,
  TABLE_INFO_TABLE
} from '@platyplus/rxdb-hasura'

import { useAppConfig, useTablesConfig } from './config'
import { useDB } from './database'

export const useTableInfo = (id: string): TableInformation => {
  const { result } = useRxDocument<TableInformation>(TABLE_INFO_TABLE, id, {
    json: true
  })
  return result
}

export const useIsTableInfoReady = () => {
  const [ready, setReady] = useState(false)
  const db = useDB()
  useEffect(() => {
    if (db) {
      const subscription = db.isReady$.subscribe((status) => setReady(status))
      return () => subscription.unsubscribe()
    }
  }, [db])
  return ready
}

export const sortTableInfo = (order: string[]) => {
  return (a: TableInformation, b: TableInformation) => {
    const indexA = order.findIndex((id) => a.id === id)
    const indexB = order.findIndex((id) => b.id === id)
    if (indexA < 0) return 1
    if (indexB < 0) return -1
    return indexA > indexB ? 1 : -1
  }
}

/**
 *
 * @param includeMissing also include collections that are not part of the order list
 * @returns
 */
export const useTableInfoList = (
  includeMissing = false
): [TableInformation[], (val: TableInformation[]) => void] => {
  const [appConfig, setAppConfig] = useAppConfig()
  const tables = useTablesConfig()

  const orderedList = useMemo(() => {
    const order = appConfig.menu_order ? [...appConfig.menu_order] : []
    const result = Object.values(tables)
      .filter(
        (table) =>
          !isManyToManyJoinTable(table) &&
          (includeMissing || order.includes(table.id))
      )
      .sort(sortTableInfo(order))
    return result
  }, [appConfig, tables, includeMissing])

  const setListOrder = useCallback(
    (val: TableInformation[]) => {
      setAppConfig({ menu_order: val.map((table) => table.id) })
    },
    [setAppConfig]
  )

  return [orderedList, setListOrder]
}

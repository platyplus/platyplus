import { useCallback, useMemo } from 'react'
import create from 'zustand'

import {
  isManyToManyJoinTable,
  TableInformation,
  tableInfoStore
} from '@platyplus/rxdb-hasura'

import { useAppConfig } from './config'

export const useTableInfoStore = create(tableInfoStore)

export const useTableInfo = (id: string): TableInformation =>
  useTableInfoStore(useCallback((store) => store.tables[id], [id]))

export const useIsTableInfoReady = () =>
  useTableInfoStore((store) => store.isReady())

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
  const tables = useTableInfoStore((state) => state.tables)

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

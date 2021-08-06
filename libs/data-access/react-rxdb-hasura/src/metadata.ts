import { useCallback, useMemo } from 'react'
import create from 'zustand'

import {
  isManyToManyJoinTable,
  Metadata,
  metadataStore
} from '@platyplus/rxdb-hasura'

import { useAppConfig } from './config'

export const useMetadataStore = create(metadataStore)

export const useMetadata = (id: string): Metadata =>
  useMetadataStore(useCallback((store) => store.tables[id], [id]))

export const useIsMetadataReady = () =>
  useMetadataStore((store) => store.isReady())

export const sortMetadata = (order: string[]) => {
  return (a: Metadata, b: Metadata) => {
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
export const useMetadataList = (
  includeMissing = false
): [Metadata[], (val: Metadata[]) => void] => {
  const [appConfig, setAppConfig] = useAppConfig()
  const tables = useMetadataStore((state) => state.tables)

  const orderedList = useMemo(() => {
    const order = appConfig.menu_order ? [...appConfig.menu_order] : []
    const result = Object.values(tables)
      .filter(
        (table) =>
          !isManyToManyJoinTable(table) &&
          (includeMissing || order.includes(table.id))
      )
      .sort(sortMetadata(order))
    return result
  }, [appConfig, tables, includeMissing])

  const setListOrder = useCallback(
    (val: Metadata[]) => {
      setAppConfig({ menu_order: val.map((table) => table.id) })
    },
    [setAppConfig]
  )

  return [orderedList, setListOrder]
}

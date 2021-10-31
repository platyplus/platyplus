import { useEffect, useState } from 'react'
import { useRxDocument } from 'rxdb-hooks'

import { TableInformation, TABLE_INFO_TABLE } from '@platyplus/rxdb-hasura'

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

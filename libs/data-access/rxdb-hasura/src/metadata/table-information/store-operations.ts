import { TableInformation } from '@platyplus/rxdb-hasura'
import produce from 'immer'

import { TableInfoStore, tableInfoStore } from '../../store'

import { TableInfo } from './types'

// TODO remove
const setTableInfo = (table: TableInfo) =>
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
      const previousTable = state.tables[table.id]
      const nextTable: TableInformation = previousTable
        ? {
            ...previousTable,
            ...table
          }
        : {
            ...table
          }
      state.tables[table.id] = nextTable
    })
  )

export const onUpsert = (doc: TableInfo) => {
  console.log('TODO re-rxdbify the table information change listener')
  setTableInfo(doc)
}

export const onDelete = (doc: TableInfo) => {
  console.log('TODO onDelete')
}

// * When receiving changes in the websocket, check if some of the tables have been removed.
// * If so, remove them from the store
// * A store subscription will then trigger the removal of the corresponding RxDB collections
export const onWsReceive = (data: TableInfo[]) => {
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
      Object.keys(tableInfoStore.getState().tables).forEach((id) => {
        if (!data.find((table) => table.id === id)) delete state.tables[id]
      })
    })
  )
}

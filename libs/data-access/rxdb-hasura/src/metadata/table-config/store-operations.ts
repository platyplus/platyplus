import produce from 'immer'
import { TableInfoStore, tableInfoStore } from '../../store'
import { TableConfig } from './types'

export const onUpsert = (doc: TableConfig) => {
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
      if (state.tables[doc.id]) {
        state.tables[doc.id].config = doc
      } else {
        state.tables[doc.id] = {
          id: doc.id,
          updated_at: doc.updated_at,
          foreignKeys: [],
          dependentForeignKeys: [],
          columns: [],
          properties: new Map()
        }
      }
    })
  )
}

export const onDelete = (doc: TableConfig) => {
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
      console.log('Delete table config is not implemented')
    })
  )
}

import produce from 'immer'
import { RxDocument } from 'rxdb'
import { ContentsCollection, Database } from '../../types'
import { collectionName, removeCollection } from '../../utils'
import { tableRoles } from '../utils'
import { TableInfoStore, tableInfoStore } from './store'

import { TableInfo } from './types'

export const onUpsert = (table: TableInfo) => {
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
      state.tables[table.id] = table
    })
  )
}

export const onDelete = async (table: RxDocument<TableInfo>) => {
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
      delete state.tables[table.id]
    })
  )
  // * Remove RxDB collections as well
  const db = table.collection.database as unknown as Database
  for (const role of tableRoles(table)) {
    const name = collectionName(table, role)
    const collection = db.collections[name] as ContentsCollection
    if (collection) await removeCollection(collection)
  }
}

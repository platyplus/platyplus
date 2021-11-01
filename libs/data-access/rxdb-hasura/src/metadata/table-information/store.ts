import { enableMapSet } from 'immer'
import create from 'zustand/vanilla'
import { devtools } from 'zustand/middleware'
import { TableInformation } from '../types'
import { ContentsCollection, ContentsDocument } from '../../types'
import { TABLE_INFO_TABLE } from './constants'

// ! The table information store is ONLY here to get table information from relationships in a synchronous manner.
// ! Always Use RxDB when possible
enableMapSet()

export type TableInfoStore = {
  tables: Record<string, TableInformation>
}

export const tableInfoStore = create<TableInfoStore>(
  devtools(
    (set, get) => ({
      tables: {}
    }),
    TABLE_INFO_TABLE
  )
)

export const getTableInfo = (id?: string) =>
  tableInfoStore.getState().tables[id]

export const getCollectionTableInfo = (collection: ContentsCollection) =>
  getTableInfo(collection.options.tableId)

export const getDocumentTableInfo = (document: ContentsDocument) =>
  getCollectionTableInfo(document.collection as ContentsCollection)

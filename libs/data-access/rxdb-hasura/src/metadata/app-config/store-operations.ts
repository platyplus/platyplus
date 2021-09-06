import produce from 'immer'

import { TableInfoStore, tableInfoStore } from '../../store'
import { AppConfig } from './types'

export const onUpsert = (doc: AppConfig) => {
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
      state.app = doc
    })
  )
}
export const onDelete = (doc: AppConfig) => {
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
      delete state.app
    })
  )
}

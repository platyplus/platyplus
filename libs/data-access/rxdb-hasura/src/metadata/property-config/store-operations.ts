import produce from 'immer'

import { TableInfoStore, tableInfoStore } from '../../store'
import { Property, PropertyConfig } from '../types'

export const onUpsert = (doc: PropertyConfig) => {
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
      const updatedTableInfo = state.tables[doc.table_id] || {
        id: doc.table_id,
        properties: new Map()
      }
      const property =
        updatedTableInfo.properties.get(doc.property_name) || ({} as Property)
      property.config = doc
      updatedTableInfo.properties.set(doc.property_name, property)
    })
  )
}
export const onDelete = (doc: PropertyConfig) => {
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
      console.warn('Delete property config is not implemented.')
    })
  )
}

import produce from 'immer'
import { MetadataStore, metadataStore } from '../../store'
import { Metadata, TableConfig } from '../../types'

export const onUpsert = (doc: TableConfig) => {
  metadataStore.setState(
    produce<MetadataStore>((state) => {
      state.tables[doc.id] = {
        ...(state.tables[doc.id] || {
          id: doc.id,
          properties: new Map()
        }),
        config: doc
      } as Metadata
    })
  )
}

export const onDelete = (doc: TableConfig) => {
  metadataStore.setState(
    produce<MetadataStore>((state) => {
      // delete state.config.tables[doc.table_id]
      console.log('TODO delete table config')
    })
  )
}
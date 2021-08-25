import produce from 'immer'

import { MetadataStore, metadataStore } from '../../../store'
import { Metadata, Property } from '../../types'
import { PropertyConfig } from '../types'

export const onUpsert = (doc: PropertyConfig) => {
  metadataStore.setState(
    produce<MetadataStore>((state) => {
      const updatedMetadata =
        state.tables[doc.table_id] ||
        ({
          id: doc.table_id,
          properties: new Map()
        } as Metadata)
      const property =
        updatedMetadata.properties.get(doc.property_name) || ({} as Property)
      property.config = doc
      updatedMetadata.properties.set(doc.property_name, property)
    })
  )
}
export const onDelete = (doc: PropertyConfig) => {
  metadataStore.setState(
    produce<MetadataStore>((state) => {
      console.warn('Delete property config is not implemented.')
    })
  )
}

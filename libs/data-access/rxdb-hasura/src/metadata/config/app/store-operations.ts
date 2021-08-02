import produce from 'immer'

import { MetadataStore, metadataStore } from '../../store'

export const onUpsert = (doc) => {
  metadataStore.setState(
    produce<MetadataStore>((state) => {
      state.app = doc
    })
  )
}
export const onDelete = (doc) => {
  metadataStore.setState(
    produce<MetadataStore>((state) => {
      delete state.app
    })
  )
}

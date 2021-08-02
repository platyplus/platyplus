import produce from 'immer'
import create from 'zustand/vanilla'
import { devtools } from 'zustand/middleware'

import { Contents, ContentsCollection, ContentsDocument } from '../types'
import { Metadata } from './types'
import { ConfigCollectionName } from './config'

export type MetadataStore = {
  tables: Record<string, Metadata>
  app?: Contents
  ready: Record<ConfigCollectionName | 'metadata', boolean>
}

export const metadataStore = create<MetadataStore>(
  devtools(
    (set, get) => ({
      tables: {},
      app: null,
      ready: {
        app_config: false,
        table_config: false,
        property_config: false,
        metadata: false
      }
    }),
    'metadata'
  )
)

export const getMetadataTable = (id: string) =>
  metadataStore.getState().tables[id]

export const getCollectionMetadata = (collection: ContentsCollection) =>
  getMetadataTable(collection._tableId)

export const getDocumentMetadata = (document: ContentsDocument) =>
  getCollectionMetadata(document.collection)

export const setCollectionIsReady = (
  collectionName: ConfigCollectionName | 'metadata'
) => {
  metadataStore.setState(
    produce<MetadataStore>((state) => {
      state.ready[collectionName] = true
    })
  )
}
export const isMetadataReady = () =>
  Object.values(metadataStore.getState().tables).every((value) => value)

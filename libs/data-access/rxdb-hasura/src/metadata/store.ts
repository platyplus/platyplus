import { DeepReadonly } from 'rxdb/dist/types/types'
import create from 'zustand/vanilla'
import produce from 'immer'
import { devtools } from 'zustand/middleware'

import {
  Contents,
  ContentsCollection,
  ContentsDocument,
  Metadata
} from '../types'

export type MetadataStore = {
  tables: Record<string, Metadata>
  config: {
    app?: Contents
    properties: Record<string, Contents>
    tables: Record<string, Contents>
  }
}

export const metadataStore = create<MetadataStore>(
  devtools(
    (set, get) => ({
      tables: {},
      config: {
        app: null,
        properties: {},
        tables: {}
      }
    }),
    'metadata'
  )
)

export const setMetadataTable = (table: Metadata | DeepReadonly<Metadata>) =>
  metadataStore.setState(
    produce((state) => {
      state.tables[table.id] = table
    })
  )

export const getMetadataTable = (id: string) =>
  metadataStore.getState().tables[id]

export const getCollectionMetadata = (collection: ContentsCollection) =>
  getMetadataTable(collection._tableId)

export const getDocumentMetadata = (document: ContentsDocument) =>
  getCollectionMetadata(document.collection)

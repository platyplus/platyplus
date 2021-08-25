import produce from 'immer'
import create from 'zustand/vanilla'
import { devtools } from 'zustand/middleware'

import { ContentsCollection, ContentsDocument } from './types'
import { AppConfig, Metadata, CONFIG_TABLES } from './metadata'
import { getNetworkState, subscribeNetworkState } from './network-state'

export type MetadataStore = {
  tables: Record<string, Metadata>
  replication: Record<string, { syncing: boolean; ready: boolean }>
  app?: AppConfig
  jwt?: string
  connected: boolean
  isSyncing: () => boolean
  isReady: () => boolean
  isConfigReady: () => boolean
}

export const metadataStore = create<MetadataStore>(
  devtools(
    (set, get) => ({
      tables: {},
      replication: {
        app_config: { ready: false, syncing: false },
        table_config: { ready: false, syncing: false },
        property_config: { ready: false, syncing: false },
        metadata: { ready: false, syncing: false }
      },
      app: null,
      jwt: null,
      connected: getNetworkState(),
      isSyncing: () =>
        Object.values(get().replication).some((value) => value.syncing),
      isReady: () => get().isConfigReady() && get().replication.metadata.ready,
      isConfigReady: () =>
        CONFIG_TABLES.every((value) => get().replication[value].ready)
    }),
    'metadata'
  )
)

subscribeNetworkState((connected) =>
  metadataStore.setState(
    produce<MetadataStore>((state) => {
      state.connected = connected
    })
  )
)

export const getMetadataTable = (id?: string) =>
  metadataStore.getState().tables[id]

export const getCollectionMetadata = (collection: ContentsCollection) =>
  getMetadataTable(collection.options.tableId)

export const getDocumentMetadata = (document: ContentsDocument) =>
  getCollectionMetadata(document.collection)

export const setCollectionIsReady = (collectionName: string) => {
  metadataStore.setState(
    produce<MetadataStore>((state) => {
      state.replication[collectionName] = {
        ready: true,
        syncing: state.replication[collectionName]?.syncing || false
      }
    })
  )
}

export const initCollection = (collectionName: string) => {
  metadataStore.setState(
    produce<MetadataStore>((state) => {
      state.replication[collectionName] = {
        ready: false,
        syncing: false
      }
    })
  )
}
export const getJwt = () => metadataStore.getState().jwt

export const setAuthStatus = (status: boolean, jwt?: string) =>
  metadataStore.setState(
    produce<MetadataStore>((partial) => {
      partial.connected = status
      partial.jwt = jwt
    })
  )

export const setJwt = (jwt: string) =>
  metadataStore.setState(
    produce<MetadataStore>((partial) => {
      partial.jwt = jwt
    })
  )

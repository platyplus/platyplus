import produce, { enableMapSet } from 'immer'
import create from 'zustand/vanilla'
import { devtools } from 'zustand/middleware'

import { ContentsCollection, ContentsDocument } from '../types'
import { AppConfig, Metadata, CONFIG_TABLES } from '../metadata'
import { getNetworkState, subscribeNetworkState } from './network-state'
import { debug } from '../console'

enableMapSet()

export type MetadataStore = {
  tables: Record<string, Metadata>
  // TODO rename 'replication'
  replication: Record<string, { syncing: boolean; ready: boolean }>
  app?: AppConfig
  authenticated: boolean
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
      authenticated: false,
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

subscribeNetworkState((connected) => {
  debug('network status changed', connected)
  metadataStore.setState(
    produce<MetadataStore>((state) => {
      state.connected = connected
    })
  )
})

export const getMetadataTable = (id?: string) =>
  metadataStore.getState().tables[id]

export const getCollectionMetadata = (collection: ContentsCollection) =>
  getMetadataTable(collection.options.tableId)

export const getDocumentMetadata = (document: ContentsDocument) =>
  getCollectionMetadata(document.collection)

export const setCollectionIsSynced = (collectionName: string) => {
  metadataStore.setState(
    produce<MetadataStore>((state) => {
      state.replication[collectionName].syncing = false
    })
  )
}
export const setCollectionIsReady = (collectionName: string) => {
  metadataStore.setState(
    produce<MetadataStore>((state) => {
      if (state.replication[collectionName])
        state.replication[collectionName].ready = true
      else
        state.replication[collectionName] = {
          ready: true,
          syncing: false
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

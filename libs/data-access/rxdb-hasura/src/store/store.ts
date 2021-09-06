import produce, { enableMapSet } from 'immer'
import create from 'zustand/vanilla'
import { devtools } from 'zustand/middleware'

import { ContentsCollection, ContentsDocument } from '../types'
import { AppConfig, CONFIG_TABLES, TableInformation } from '../metadata'
import { getNetworkState, subscribeNetworkState } from './network-state'
import { debug } from '../console'

enableMapSet()

export type TableInfoStore = {
  tables: Record<string, TableInformation>
  // TODO rename 'replication'
  replication: Record<string, { syncing: boolean; ready: boolean }>
  app?: AppConfig
  authenticated: boolean
  jwt?: string
  admin: boolean
  connected: boolean
  isSyncing: () => boolean
  isReady: () => boolean
  isConfigReady: () => boolean
}

export const tableInfoStore = create<TableInfoStore>(
  devtools(
    (set, get) => ({
      tables: {},
      replication: {
        app_config: { ready: false, syncing: false },
        table_config: { ready: false, syncing: false },
        property_config: { ready: false, syncing: false },
        table_info: { ready: false, syncing: false }
      },
      app: null,
      authenticated: false,
      jwt: null,
      admin: false,
      connected: getNetworkState(),
      isSyncing: () =>
        Object.values(get().replication).some((value) => value.syncing),
      isReady: () =>
        get().isConfigReady() && get().replication.table_info.ready,
      isConfigReady: () =>
        CONFIG_TABLES.every((value) => get().replication[value].ready)
    }),
    'table_info'
  )
)

subscribeNetworkState((connected) => {
  debug('network status changed', connected)
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
      state.connected = connected
    })
  )
})

export const getTableInfo = (id?: string) =>
  tableInfoStore.getState().tables[id]

export const getCollectionTableInfo = (collection: ContentsCollection) =>
  getTableInfo(collection.options.tableId)

export const getDocumentTableInfo = (document: ContentsDocument) =>
  getCollectionTableInfo(document.collection)

export const setCollectionIsSynced = (collectionName: string) => {
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
      state.replication[collectionName].syncing = false
    })
  )
}
export const setCollectionIsReady = (collectionName: string) => {
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
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
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
      state.replication[collectionName] = {
        ready: false,
        syncing: false
      }
    })
  )
}

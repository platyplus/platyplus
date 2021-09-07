import produce, { enableMapSet } from 'immer'
import create from 'zustand/vanilla'
import { devtools } from 'zustand/middleware'

import { ContentsCollection, ContentsDocument } from '../types'
import {
  APP_CONFIG_TABLE,
  CONFIG_TABLES,
  PROPERTY_CONFIG_TABLE,
  TableInformation,
  TABLE_CONFIG_TABLE,
  TABLE_INFO_TABLE
} from '../metadata'
import { getNetworkState, subscribeNetworkState } from './network-state'
import { debug } from '../console'

enableMapSet()

export type TableInfoStore = {
  tables: Record<string, TableInformation>
  // TODO remove 'replication' - see following todos
  replication: Record<string, { syncing: boolean; ready: boolean }>
  authenticated: boolean
  jwt?: string
  admin: boolean
  connected: boolean
  // TODO remove isConfigReady and use RxJSs combineLatest in RxDB
  isSyncing: () => boolean
  // TODO remove isConfigReady and use RxJSs combineLatest in RxDB
  isReady: () => boolean
  // TODO remove isConfigReady and use RxJSs combineLatest in RxDB
  isConfigReady: () => boolean
}

export const tableInfoStore = create<TableInfoStore>(
  devtools(
    (set, get) => ({
      tables: {},
      replication: {
        [APP_CONFIG_TABLE]: { ready: false, syncing: false },
        [TABLE_CONFIG_TABLE]: { ready: false, syncing: false },
        [PROPERTY_CONFIG_TABLE]: { ready: false, syncing: false },
        [TABLE_INFO_TABLE]: { ready: false, syncing: false }
      },
      authenticated: false,
      jwt: null,
      admin: false,
      connected: getNetworkState(),
      isSyncing: () =>
        Object.values(get().replication).some((value) => value.syncing),
      isReady: () =>
        get().isConfigReady() && get().replication[TABLE_INFO_TABLE].ready,
      isConfigReady: () =>
        CONFIG_TABLES.every((value) => get().replication[value].ready)
    }),
    TABLE_INFO_TABLE
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
  getCollectionTableInfo(document.collection as ContentsCollection)

// TODO get rid of this
export const setCollectionIsSynced = (collectionName: string) => {
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
      state.replication[collectionName].syncing = false
    })
  )
}

// TODO get rid of this
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

// TODO get rid of this
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

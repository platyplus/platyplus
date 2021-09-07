import { RxCollection, RxPlugin } from 'rxdb'
import { distinctUntilChanged, Observable, BehaviorSubject } from 'rxjs'
import { debug } from './console'
import { createContentReplicator, createHooks } from './contents'

import {
  ConfigCollection,
  CONFIG_TABLES,
  PLATYPLUS_TABLES,
  TableInfoCollection
} from './metadata'
import { createSettingsReplicator } from './metadata'
import { ContentsCollection, Database } from './types'

const readyTables = new BehaviorSubject<string[]>([])
export const setReplicationReady = (name: string) => {
  const value = readyTables.getValue()
  if (!value.includes(name)) {
    value.push(name)
    readyTables.next(value)
  }
}
export const setReplicationBusy = (name: string) => {
  const state = readyTables.getValue()
  const value = state.filter((v) => v !== name)
  if (value.length !== state.length) {
    readyTables.next(value)
  }
}

export const RxHasuraPlugin: RxPlugin = {
  name: 'hasura-plugin',
  rxdb: true, // * this must be true so rxdb knows that this is a rxdb-plugin and not a pouchdb-plugin

  prototypes: {
    RxDatabase: (proto: Database) => {
      proto.isConfigReady$ = new Observable((subscriber) => {
        readyTables.subscribe((tables) =>
          subscriber.next(CONFIG_TABLES.every((name) => tables.includes(name)))
        )
      }).pipe(distinctUntilChanged<boolean>())
      proto.isReady$ = new Observable((subscriber) => {
        readyTables.subscribe((tables) =>
          subscriber.next(
            PLATYPLUS_TABLES.every((name) => tables.includes(name))
          )
        )
      }).pipe(distinctUntilChanged<boolean>())
    }
  },
  hooks: {
    createRxCollection: async (collection: RxCollection): Promise<void> => {
      debug(`create RxCollection ${collection.name}`, collection.options)
      if (collection.options.tableId) {
        // * tableId option => this is a Contents collection
        createHooks(collection as ContentsCollection)
        await createContentReplicator(collection as ContentsCollection)
      } else if (collection.options.isTableInfo) {
        // * isTableInfo option => this is a TableInfo collection
        await createSettingsReplicator(collection as TableInfoCollection)
      } else if (collection.options.isConfig) {
        // * isTableInfo option => this is a config collection
        await createSettingsReplicator(collection as ConfigCollection)
      }
    }
  }
}

import { RxCollection, RxPlugin } from 'rxdb'
import { debug } from './utils'
import { createContentReplicator, createHooks } from './contents'
import { ConfigCollection, TableInfoCollection } from './metadata'
import { createSettingsReplicator } from './metadata'
import { addStateToDatabasePrototype } from './state'
import { ContentsCollection, Database } from './types'

export const RxHasuraPlugin: RxPlugin = {
  name: 'hasura-plugin',
  rxdb: true, // * this must be true so rxdb knows that this is a rxdb-plugin and not a pouchdb-plugin

  prototypes: {
    RxDatabase: (proto: Database) => {
      addStateToDatabasePrototype(proto)
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

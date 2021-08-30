import { RxCollection, RxPlugin } from 'rxdb'
import { debug } from './console'
import { createContentReplicator, createHooks } from './contents'

import { createMetadataReplicator, MetadataCollection } from './metadata'
import { createConfigReplicator } from './metadata'
import { ContentsCollection } from './types'

export const RxHasuraPlugin: RxPlugin = {
  name: 'hasura-plugin',
  rxdb: true, // * this must be true so rxdb knows that this is a rxdb-plugin and not a pouchdb-plugin

  prototypes: {},
  hooks: {
    createRxCollection: async (collection: RxCollection): Promise<void> => {
      debug(`create RxCollection ${collection.name}`, collection.options)
      if (collection.options.tableId) {
        // * tableId option => this is a Contents collection
        createHooks(collection as ContentsCollection)
        await createContentReplicator(collection as ContentsCollection)
      } else if (collection.options.isMetadata) {
        // * isMetadata option => this is a Metadata collection
        await createMetadataReplicator(collection as MetadataCollection)
      } else if (collection.options.isConfig) {
        // * isMetadata option => this is a config collection
        await createConfigReplicator(collection)
      }
    }
  }
}

import { RxPlugin } from 'rxdb'
import { debug } from './console'
import { createContentReplicator, createHooks } from './contents'

import { createMetadataReplicator, MetadataCollection } from './metadata'
import { ContentsCollection } from './types'

export const RxHasuraPlugin: RxPlugin = {
  name: 'hasura-plugin',
  rxdb: true, // this must be true so rxdb knows that this is a rxdb-plugin and not a pouchdb-plugin

  prototypes: {},
  hooks: {
    createRxCollection: async (
      collection: ContentsCollection
    ): Promise<void> => {
      if (collection.options.metadata) {
        // * Metadata option => this is a Contents collection
        collection.role = collection.options.role
        collection.tableId = collection.options.metadata.id
        debug(`create RxCollection ${collection.name}`)
        createHooks(collection)
        await createContentReplicator(collection, collection.options.role)
      } else if (collection.options.isMetadataCollection) {
        // * isMetadata option => this is a Metadata collection
        await createMetadataReplicator(
          collection as unknown as MetadataCollection
        )
      }
    }
  }
}

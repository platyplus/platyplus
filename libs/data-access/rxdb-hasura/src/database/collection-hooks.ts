import { debug } from '../console'
import { createContentReplicator, createHooks } from '../contents'
import { createMetadataReplicator, MetadataCollection } from '../metadata'
import { ContentsCollection } from '../types'
import { contentsCollections } from './helpers'
import { contents } from './observables'

export const createRxCollection = async (
  collection: ContentsCollection
): Promise<void> => {
  if (collection.options.metadata) {
    // * Metadata option => this is a Contents collection
    collection.role = collection.options.role
    collection._tableId = collection.options.metadata.id
    debug(`create RxCollection ${collection.name}`)
    createHooks(collection)
    contents.next({
      ...contentsCollections(collection.database),
      [collection.name]: collection
    })
    await createContentReplicator(collection, collection.options.role)
  } else if (collection.options.isMetadataCollection) {
    // * isMetadata option => this is a Metadata collection
    await createMetadataReplicator(collection as unknown as MetadataCollection)
  }
}

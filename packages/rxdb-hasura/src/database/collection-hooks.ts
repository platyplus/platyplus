import { info } from '../console'
import { createContentReplicator, createHooks } from '../contents'
import { ContentsCollection } from '../types'
import { hasuraCollections } from './helpers'
import { hasura } from './observables'

export const createRxCollection = async (
  collection: ContentsCollection
): Promise<void> => {
  if (collection.options.metadata) {
    collection.metadata = collection.options.metadata
    await createContentReplicator(collection)
    info(`create RxCollection ${collection.name}`)
    createHooks(collection)
    hasura.next({
      ...hasuraCollections(collection.database),
      [collection.name]: collection
    })
  }
}

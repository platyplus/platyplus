import { info } from '../console'
import { createHooks } from '../contents/collection-hooks'
import { createContentReplicator } from '../contents/replicator'
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

import { ContentsCollection } from '../../types'

import { pullModifier, pullQueryBuilder } from './pull'
import { pushModifier, pushQueryBuilder } from './push'
import { createReplicator } from '../../replicator'
import { subscriptionQuery } from './subscribe'

const DEFAULT_BATCH_SIZE = 5

export const createContentReplicator = async (collection: ContentsCollection) =>
  createReplicator(collection, {
    role: collection.options.role,
    url: collection.database.options.url,
    pull: {
      queryBuilder: pullQueryBuilder(collection, DEFAULT_BATCH_SIZE),
      modifier: pullModifier(collection)
    },
    push: {
      queryBuilder: pushQueryBuilder(collection),
      modifier: pushModifier(collection)
    },
    subscription: {
      query: subscriptionQuery(collection)
    }
  })

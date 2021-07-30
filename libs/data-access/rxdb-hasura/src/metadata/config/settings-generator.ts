import { print } from 'graphql/language/printer'
import { CollectionConfig } from './types'

export const generateCollectionSettings = (config: CollectionConfig) => {
  return {
    pullQueryBuilder: (doc) => ({
      query: print(config.query),
      variables: {
        batchSize,
        updated_at: doc?.updated_at || new Date(0).toUTCString()
      }
    }),
    pushQueryBuilder: (doc) => ({
      query: print(config.mutation),
      variables: {
        objects: doc
      }
    }),
    subscription: print(config.subscription)
  }
}
const batchSize = 5

import produce from 'immer'
import { print } from 'graphql/language/printer'
import { info } from '../../console'
import { CollectionConfig } from './types'
import { isConsoleEnabled } from './utils'
import { upsertWithMigration } from './hasura-migrations'

const curateData = produce((data) => {
  Object.keys(data)
    .filter((key) => key.startsWith('_'))
    .forEach((key) => delete data[key])
})

export const generateCollectionSettings = (
  collectionName: string,
  config: CollectionConfig
) => {
  return {
    pullQueryBuilder: (doc) => ({
      query: print(config.query),
      variables: {
        batchSize,
        updated_at: doc?.updated_at || new Date(0).toUTCString()
      }
    }),
    pushQueryBuilder: async (doc) => {
      doc.deleted = doc._deleted
      return {
        query: print(config.mutation),
        variables: {
          objects: curateData(doc)
        }
      }
    },
    pushModifier: async (doc) => {
      if (!isConsoleEnabled()) {
        try {
          await upsertWithMigration(collectionName, curateData(doc))
          return null
        } catch {
          info(
            'Could not save the migration through Hasura Console. Falling back to regular GraphQL replication'
          )
        }
      }
      return doc
    },
    subscription: print(config.subscription)
  }
}
const batchSize = 5

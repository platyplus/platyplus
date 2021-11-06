import produce from 'immer'
import { print } from 'graphql/language/printer'

import { info } from '@platyplus/logger'

import { Database } from '../../../types'
import { CollectionSettings } from '../types'

const curateData = produce((data) => {
  Object.keys(data)
    .filter((key) => key.startsWith('_'))
    .forEach((key) => delete data[key])
})

export const generateReplicationSettings = (
  collectionName: string,
  config: CollectionSettings
) => {
  return {
    pullQueryBuilder: (doc) => ({
      query: print(config.query),
      variables: {
        batchSize,
        updated_at: doc?.updated_at || new Date(0).toUTCString()
      }
    }),
    pushQueryBuilder: config.mutation
      ? async (doc) => {
          doc.deleted = doc._deleted
          return {
            query: print(config.mutation),
            variables: {
              objects: curateData(doc)
            }
          }
        }
      : null,
    pushModifier: config.mutation
      ? async (doc) => {
          const db: Database = doc.collection.database
          if (db.isAdmin$.getValue()) {
            return doc
          } else {
            info(
              collectionName,
              'User is not admin. Cannot push config changes to the server'
            )
            return null
          }
        }
      : null,
    subscription: print(config.subscription)
  }
}
const batchSize = 5

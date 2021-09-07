import produce from 'immer'
import { print } from 'graphql/language/printer'

import { info } from '../console'
import { tableInfoStore } from '../store'
import { upsertWithMigration } from './hasura-migrations'
import { CollectionSettings } from './types'

export const TABLE_CONFIG_TABLE = 'table_config'
export const APP_CONFIG_TABLE = 'app_config'
export const PROPERTY_CONFIG_TABLE = 'property_config'
export const TABLE_INFO_TABLE = 'table_info'

export const CONFIG_TABLES: string[] = [
  APP_CONFIG_TABLE,
  PROPERTY_CONFIG_TABLE,
  TABLE_CONFIG_TABLE
]

export const isConsoleEnabled = (): boolean => {
  return document.location.hostname === 'localhost'
}

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
          if (isConsoleEnabled()) {
            try {
              await upsertWithMigration(collectionName, curateData(doc))
              return null
            } catch {
              info('Could not save the migration through Hasura Console.')
              if (tableInfoStore.getState().admin) {
                return doc
              } else {
                info(
                  'User is not admin. Cannot fall back to regular GraphQL replication'
                )
                return null
              }
            }
          }
          return doc
        }
      : null,
    subscription: print(config.subscription)
  }
}
const batchSize = 5

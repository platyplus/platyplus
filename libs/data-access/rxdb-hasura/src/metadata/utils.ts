import produce from 'immer'
import { print } from 'graphql/language/printer'

import { info } from '../utils'
import { upsertWithMigration } from './hasura-migrations'
import { CollectionSettings, TableInformation } from './types'
import { Database } from '../types'

export const tableName = ({
  metadata: {
    table: { schema, name }
  }
}: TableInformation): string =>
  schema === 'public' ? `${name}` : `${schema}_${name}`

export const tableRoles = (table: TableInformation): string[] => {
  const roles: string[] = []
  table.metadata.select_permissions?.forEach((p) => {
    if (!roles.includes(p.role)) roles.push(p.role)
  })
  table.metadata.insert_permissions?.forEach((p) => {
    if (!roles.includes(p.role)) roles.push(p.role)
  })
  return roles
}
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
              const db: Database = doc.collection.database
              if (db.isAdmin$.getValue()) {
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

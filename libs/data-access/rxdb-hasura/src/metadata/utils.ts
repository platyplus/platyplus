import produce from 'immer'
import { print } from 'graphql/language/printer'

import { info } from '../utils'
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
  // TODO ping localhost:9693
  return (
    document.location.hostname === 'localhost' ||
    document.location.hostname.includes('127.0.0.1')
  )
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
          const db: Database = doc.collection.database
          if (db.isAdmin$.getValue()) {
            return doc
          } else {
            info('User is not admin. Cannot push config changes to the server')
            return null
          }
        }
      : null,
    subscription: print(config.subscription)
  }
}
const batchSize = 5

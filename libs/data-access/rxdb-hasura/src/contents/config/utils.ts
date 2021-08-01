import { Contents, Metadata } from '../../types'
import { metadataName } from '../../utils'
import {
  appConfigToSql,
  createSqlMigrations,
  tableConfigToSql
} from './migrations'
import produce from 'immer'

export type ConfigCollectionName =
  | 'app_config'
  | 'property_config'
  | 'table_config'

export const CONFIG_TABLES: string[] = [
  'app_config',
  'property_config',
  'table_config'
]

export const isConfigTable = (metadata: Metadata): boolean => {
  // TODO should be useless as config collections should not be considered as contents collections
  // TODO move the special graphql config 'push' to metadata/config in rxdb-hasura
  return metadata.schema === 'metadata' && CONFIG_TABLES.includes(metadata.name)
}

export const isConsoleEnabled = (): boolean => {
  return document.location.hostname === 'localhost'
}

const curateData = produce((data) => {
  Object.keys(data)
    .filter((key) => key.startsWith('_'))
    .forEach((key) => delete data[key])
  if (data.label) delete data.label
})

// TODO revoir avec le nouveau systeme
export const upsertWithMigration = async (table: Metadata, data: Contents) => {
  // ? how to make it work with batches to avoid multiple migration files ?
  const title = metadataName(table)
  const curatedData = curateData(data)

  const sql = {
    metadata_app_config: () => appConfigToSql(curatedData),
    metadata_table_config: () => tableConfigToSql(table.id, curatedData)
    // TODO
    // 'metadata_property_config': () => propertyConfigToSql(table.id, 'todo', curatedData)
  }[title]
  if (sql) {
    await createSqlMigrations([sql()])
  } else {
    console.warn('TODO not implemented yet', title)
  }
}

import { Contents, Metadata } from '../../types'
import { metadataName } from '../../utils'
import {
  appConfigToSql,
  createSqlMigrations,
  tableConfigToSql
} from './migrations'
import produce from 'immer'
export const APP_CONFIG_COLLECTION = 'me_metadata_app_config'
export const TABLE_CONFIG_COLLECTION = 'me_metadata_table_config'
export const PROPERTY_CONFIG_COLLECTION = 'me_metadata_property_config'
export type ConfigCollectionName =
  | 'me_metadata_app_config'
  | 'me_metadata_table_config'
  | 'me_metadata_property_config'

const CONFIG_TABLES = [
  'metadata_app_config',
  'metadata_table_config',
  'metadata_property_config'
]
export const CONFIG_COLLECTIONS: ConfigCollectionName[] = [
  APP_CONFIG_COLLECTION,
  TABLE_CONFIG_COLLECTION,
  PROPERTY_CONFIG_COLLECTION
]
export const CONFIG_COLLECTION_IDS: Record<ConfigCollectionName, string> = {
  me_metadata_app_config: 'id',
  me_metadata_table_config: 'table_id',
  me_metadata_property_config: 'property_id'
}
export const isConfigTable = (table: Metadata): boolean => {
  const title = metadataName(table)
  return CONFIG_TABLES.includes(title)
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

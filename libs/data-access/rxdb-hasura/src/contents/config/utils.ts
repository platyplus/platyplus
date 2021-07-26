import { Contents, Metadata } from '../../types'
import { metadataName } from '../../utils'
import { appConfigToSql, createSqlMigrations } from './migrations'

export const CONFIG_TABLES = ['metadata_app_config']

export const isConfigTable = (table: Metadata): boolean => {
  const title = metadataName(table)
  return CONFIG_TABLES.includes(title)
}

export const isConsoleEnabled = (): boolean => {
  return document.location.hostname === 'localhost'
}

export const upsertWithMigration = async (table: Metadata, data: Contents) => {
  // ? how to make it work with batches to avoid multiple migration files ?
  const title = metadataName(table)
  if (title === 'metadata_app_config') {
    const sql = appConfigToSql(data)
    await createSqlMigrations([sql])
  }
  //   TODO complete with table_config and property_config
  return
}

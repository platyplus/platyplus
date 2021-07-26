import { Contents, Metadata } from '../../types'
import { metadataName } from '../../utils'
import { appConfigToSql, createSqlMigrations } from './migrations'
import produce from 'immer'
export const CONFIG_TABLES = ['metadata_app_config']

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

  if (title === 'metadata_app_config') {
    const sql = appConfigToSql(curatedData)
    await createSqlMigrations([sql])
  }
  //   TODO complete with table_config and property_config
}

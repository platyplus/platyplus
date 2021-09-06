/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { escape } from 'sqlstring'
import { PropertyConfig } from './types'
import { Contents } from '../types'

const CONSOLE_API = 'http://localhost:9693/apis'
const client = axios.create({ baseURL: CONSOLE_API })

const escapeValues = (values: Record<string, unknown>) =>
  Object.entries(values).reduce((acc, [key, value]) => {
    if (typeof value === 'object') {
      acc[key] = `'${JSON.stringify(value).replace(/[']/g, "''")}'::jsonb`
    } else acc[key] = value == null ? null : escape(value)
    return acc
  }, {})

const upsertQuery = (
  table: string,
  updateValues: Record<string, any>,
  insertValues: Record<string, any>,
  constraint: string
) => {
  const insert = escapeValues({ ...insertValues, ...updateValues })
  const sqlInsert = `INSERT INTO ${table} (${Object.keys(insert)
    .map((v) => `"${v}"`)
    .join(', ')}) VALUES(${Object.values(insert).join(', ')})`
  const update = escapeValues(updateValues)

  const sqlUpdate = `ON CONFLICT ON CONSTRAINT ${constraint} DO UPDATE SET ${Object.entries(
    update
  )
    .map(([key, value]) => `"${key}" = ${value}`)
    .join(', ')}`
  return `${sqlInsert} ${sqlUpdate};`
}

const tableConfigToSql = (id: string, config: Contents) => {
  return upsertQuery(
    `platyplus.table_config`,
    config,
    { id },
    'table_config_pkey'
  )
}

const appConfigToSql = (config: Contents) => {
  const { id, ...updateValues } = config
  return upsertQuery(
    `platyplus.app_config`,
    config,
    updateValues,
    'app_config_pkey'
  )
}

const propertyConfigToSql = (config: PropertyConfig) => {
  const insertValues = { ...config }
  const { id, ...updateValues } = config
  insertValues.property_name = id.substring(id.lastIndexOf('.') + 1)
  insertValues.table_id = id.substring(0, id.lastIndexOf('.'))
  return upsertQuery(
    `platyplus.property_config`,
    insertValues,
    updateValues,
    'property_config_pkey'
  )
}

export const createSqlMigrations = async (
  sqlOperations: string[]
): Promise<void> => {
  if (!sqlOperations.length) return
  const sql = sqlOperations.join('\n')
  const request = {
    name: 'upsert_config',
    up: [
      {
        type: 'run_sql',
        args: {
          sql,
          cascade: false,
          read_only: false
        }
      }
    ],
    down: [], // ? generate SQL request for previous value from existing
    skip_execution: false
  }
  await client.post('/migrate', request)
  console.info('OK')
}

export const upsertWithMigration = async (
  collectionName: string,
  data: any
) => {
  // ? how to make it work with batches to avoid multiple migration files ?
  const sql = {
    app_config: () => appConfigToSql(data),
    table_config: () => tableConfigToSql(data.id, data),
    property_config: () => propertyConfigToSql(data)
  }[collectionName]
  if (sql) {
    await createSqlMigrations([sql()])
  } else {
    console.warn(
      `upsertWithMigration not implemented for collection ${collectionName}`
    )
  }
}

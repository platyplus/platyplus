/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { escape } from 'sqlstring'

import { info, warn } from '@platyplus/logger'

import { Contents } from '../types'
import {
  APP_CONFIG_TABLE,
  CONSOLE_API,
  PROPERTY_CONFIG_TABLE,
  TABLE_CONFIG_TABLE
} from '../constants'

import { PropertyConfig } from './types'

const client = axios.create({ baseURL: CONSOLE_API })

const escapeValues = (values: Record<string, unknown>) =>
  Object.entries(values).reduce((acc, [key, value]) => {
    // ? Not ideal: does not update a value set to 'null' - still, not the case yet...
    if (value !== null) {
      if (typeof value === 'object') {
        acc[key] = `'${JSON.stringify(value).replace(/[']/g, "''")}'::jsonb`
      } else {
        acc[key] = value == null ? null : escape(value)
      }
    }
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
    `platyplus.${TABLE_CONFIG_TABLE}`,
    config,
    { id },
    `${TABLE_CONFIG_TABLE}_pkey`
  )
}

const appConfigToSql = (config: Contents) => {
  const { id, ...updateValues } = config
  return upsertQuery(
    `platyplus.${APP_CONFIG_TABLE}`,
    config,
    updateValues,
    `${APP_CONFIG_TABLE}_pkey`
  )
}

const propertyConfigToSql = (config: PropertyConfig) => {
  const insertValues = { ...config }
  const { id, ...updateValues } = config
  insertValues.property_name = id.substring(id.lastIndexOf('.') + 1)
  insertValues.table_id = id.substring(0, id.lastIndexOf('.'))
  return upsertQuery(
    `platyplus.${PROPERTY_CONFIG_TABLE}`,
    insertValues,
    updateValues,
    `${PROPERTY_CONFIG_TABLE}_pkey`
  )
}

export const createSqlMigrations = async (
  sqlOperations: string[]
): Promise<void> => {
  if (!sqlOperations.length) return
  const sql = sqlOperations.join('\n')
  const request = {
    name: 'upsert_config',
    datasource: 'default',
    up: [
      {
        type: 'run_sql',
        args: {
          source: 'default',
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
  info('Migration created')
}

export const createSqlConfigInstruction = (collectionName: string, data: any) =>
  ({
    [APP_CONFIG_TABLE]: () => appConfigToSql(data),
    [TABLE_CONFIG_TABLE]: () => tableConfigToSql(data.id, data),
    [PROPERTY_CONFIG_TABLE]: () => propertyConfigToSql(data)
  }[collectionName]?.())

export const upsertConfigWithMigration = async (
  collectionName: string,
  data: any
) => {
  const sql = createSqlConfigInstruction(collectionName, data)
  if (sql) {
    await createSqlMigrations([sql])
  } else {
    warn(`upsertWithMigration not implemented for collection ${collectionName}`)
  }
}

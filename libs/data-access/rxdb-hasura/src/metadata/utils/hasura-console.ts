/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { escape } from 'sqlstring'

import { info } from '@platyplus/logger'

import { CONSOLE_API } from '../../constants'
import {
  APP_CONFIG_TABLE,
  PAGES_TABLE,
  PROPERTY_CONFIG_TABLE,
  TABLE_CONFIG_TABLE
} from '../constants'

const client = axios.create({ baseURL: CONSOLE_API })

const escapeValues = (values: Record<string, unknown>) =>
  Object.entries(values).reduce((acc, [key, value]) => {
    // ? Not ideal: does not update a value set to 'null' - still, not the case yet...
    if (value !== null) {
      if (typeof value === 'object') {
        acc[key] = `'${JSON.stringify(value).replace(/[']/g, "''")}'::jsonb`
      } else {
        acc[key] = value == null ? 'DEFAULT' : escape(value)
      }
    }
    return acc
  }, {})

export const upsertQuery = (
  collection: string,

  updateValues: Record<string, any>,
  insertValues: Record<string, any>
) => {
  const sep = collection.indexOf('_')
  const schema = collection.substring(0, sep)
  const table = collection.substring(sep + 1)
  const insert = escapeValues({ ...insertValues, ...updateValues })
  const sqlInsert = `INSERT INTO ${schema}.${table} (${Object.keys(insert)
    .map((v) => `"${v}"`)
    .join(', ')}) VALUES(${Object.values(insert).join(', ')})`
  const update = escapeValues(updateValues)

  const sqlUpdate = `ON CONFLICT ON CONSTRAINT ${table}_pkey DO UPDATE SET ${Object.entries(
    update
  )
    .map(([key, value]) => `"${key}" = ${value}`)
    .join(', ')}`
  return `${sqlInsert} ${sqlUpdate};`
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
  info('migration', 'created')
}

const upsertQueries = {
  [TABLE_CONFIG_TABLE]: (config) => {
    return upsertQuery(TABLE_CONFIG_TABLE, config, { id: config.id })
  },
  [PROPERTY_CONFIG_TABLE]: (config) => {
    const insertValues = { ...config }
    const { id, ...updateValues } = config
    insertValues.property_name = id.substring(id.lastIndexOf('.') + 1)
    insertValues.table_id = id.substring(0, id.lastIndexOf('.'))
    return upsertQuery(PROPERTY_CONFIG_TABLE, insertValues, updateValues)
  },
  [PAGES_TABLE]: (config) => {
    const insertValues = { ...config }
    const { id, ...updateValues } = config
    return upsertQuery(PAGES_TABLE, insertValues, updateValues)
  },
  [APP_CONFIG_TABLE]: (config) => {
    const { id, ...updateValues } = config
    return upsertQuery(APP_CONFIG_TABLE, config, updateValues)
  }
}
export const createSqlConfigInstruction = (collectionName: string, data: any) =>
  upsertQueries[collectionName]?.(data)

import axios from 'axios'
import { escape } from 'sqlstring'
import { Contents, Metadata, PropertyConfig } from '../../types'

const CONSOLE_API = 'http://localhost:9693/apis'
const client = axios.create({ baseURL: CONSOLE_API })

const escapeValues = (values: Record<string, unknown>) =>
  Object.entries(values).reduce((acc, [key, value]) => {
    if (typeof value === 'object') {
      acc[key] = `'${JSON.stringify(value).replace(/[']/g, "''")}'::jsonb`
    } else acc[key] = escape(value)
    return acc
  }, {})

const upsertQuery = (
  table: string,
  updateValues: Record<string, unknown>,
  insertValues: Record<string, unknown>,
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

export const tableConfigToSql = (
  table_id: string,
  config: Metadata['config']
) =>
  upsertQuery(
    `metadata.table_config`,
    config,
    { table_id },
    'table_config_table_id_key'
  )

export const appConfigToSql = (config: Contents) => {
  const { id, ...updateValues } = config
  return upsertQuery(
    `metadata.app_config`,
    config,
    updateValues,
    'app_config_pkey'
  )
}

export const propertyConfigToSql = (
  table_id: string,
  property_name: string,
  config?: PropertyConfig
) =>
  upsertQuery(
    `metadata.property_config`,
    config,
    { property_id: `${table_id}.${property_name}`, table_id, property_name },
    'property_config_property_id_key'
  )

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

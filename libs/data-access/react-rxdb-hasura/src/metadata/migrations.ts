import { Metadata, PropertyConfig } from '@platyplus/rxdb-hasura'
import axios from 'axios'
import sqlstring from 'sqlstring'

const CONSOLE_API = 'http://localhost:9693/apis'
const client = axios.create({ baseURL: CONSOLE_API })

export const tableConfigToSql = (
  tableId: string,
  config: Metadata['config']
) => {
  const params = { table_id: tableId, ...config }
  const sqlInsert = sqlstring.format(
    `INSERT INTO metadata.table_config (${Object.keys(params).join(
      ', '
    )}) VALUES(${Array(Object.keys(params).length).fill('?').join(', ')})`,
    Object.values(params)
  )
  const sqlUpdate = sqlstring
    .format(
      `ON CONFLICT ON CONSTRAINT table_config_table_id_key DO UPDATE SET ?`,
      config
    )
    .replace(/[`]/g, '') // TODO unsafe
  return `${sqlInsert} ${sqlUpdate};`
}

export const propertyConfigToSql = (
  tableId: string,
  property: string,
  config?: PropertyConfig
) => {
  const params = {
    property_id: `${tableId}.${property}`,
    table_id: tableId,
    property_name: property,
    ...config
  }
  const sqlInsert = sqlstring.format(
    `INSERT INTO metadata.property_config (${Object.keys(params).join(
      ', '
    )}) VALUES(${Array(Object.keys(params).length).fill('?').join(', ')})`,
    Object.values(params)
  )
  const sqlUpdate = sqlstring
    .format(
      `ON CONFLICT ON CONSTRAINT property_config_property_id_key DO UPDATE SET ?`,
      { table_id: tableId, ...config }
    )
    .replace(/[`]/g, '') // TODO unsafe
  return `${sqlInsert} ${sqlUpdate};`
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
  console.log('OK')
}

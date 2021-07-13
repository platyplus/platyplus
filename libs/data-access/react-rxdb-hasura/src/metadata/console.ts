import { PropertyConfig } from '@platyplus/rxdb-hasura'
import axios from 'axios'
import sqlstring from 'sqlstring'

const CONSOLE_API = 'http://localhost:9693/apis'
const client = axios.create({ baseURL: CONSOLE_API })

export const upsertPropertyConfig = async (
  tableId: string,
  property: string,
  config?: PropertyConfig
): Promise<void> => {
  const propertyId = `${tableId}.${property}`
  const params = [
    tableId,
    property,
    config.title,
    config.description,
    config.icon,
    config.json_schema,
    config.component
  ]
  const sqlInsert = sqlstring.format(
    `INSERT INTO metadata.property_config (property_id, table_id, property_name, title, description, icon, json_schema, component) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
    [propertyId, ...params]
  )
  const sqlUpdate = sqlstring
    .format(
      `ON CONFLICT ON CONSTRAINT property_config_property_id_key DO UPDATE SET ?`,
      { table_id: tableId, ...config }
    )
    .replace(/[`]/g, '') // TODO unsafe
  const sql = `${sqlInsert} ${sqlUpdate};`
  const request = {
    name: `upsert_property_config_${propertyId}`,
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

export type ConfigCollectionName =
  | typeof APP_CONFIG_TABLE
  | typeof PROPERTY_CONFIG_TABLE
  | typeof TABLE_CONFIG_TABLE

export const METADATA_ROLE = 'me'
export const ADMIN_ROLE = 'admin'

export const TABLE_CONFIG_TABLE = 'table_config'
export const APP_CONFIG_TABLE = 'app_config'
export const PROPERTY_CONFIG_TABLE = 'property_config'
export const TABLE_INFO_TABLE = 'table_info'

export const CONFIG_TABLES: ConfigCollectionName[] = [
  APP_CONFIG_TABLE,
  PROPERTY_CONFIG_TABLE,
  TABLE_CONFIG_TABLE
]
export const PLATYPLUS_TABLES = [...CONFIG_TABLES, TABLE_INFO_TABLE]

export const CONSOLE_API = 'http://localhost:9693/apis'

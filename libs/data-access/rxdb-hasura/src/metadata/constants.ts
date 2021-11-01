import { appConfig, APP_CONFIG_TABLE } from './app-config'
import { propertyConfig, PROPERTY_CONFIG_TABLE } from './property-config'
import { tableConfig, TABLE_CONFIG_TABLE } from './table-config'
import { pages, PAGES_TABLE } from './page'
import { TABLE_INFO_TABLE } from './table-information'

export const CONFIG_COLLECTIONS_DEFINITIONS = {
  [APP_CONFIG_TABLE]: appConfig,
  [TABLE_CONFIG_TABLE]: tableConfig,
  [PROPERTY_CONFIG_TABLE]: propertyConfig,
  [PAGES_TABLE]: pages
}

export const CONFIG_TABLES = [
  APP_CONFIG_TABLE,
  PROPERTY_CONFIG_TABLE,
  TABLE_CONFIG_TABLE,
  PAGES_TABLE
]

export const PLATYPLUS_TABLES = [...CONFIG_TABLES, TABLE_INFO_TABLE]
export {
  APP_CONFIG_TABLE,
  PROPERTY_CONFIG_TABLE,
  TABLE_CONFIG_TABLE,
  PAGES_TABLE,
  TABLE_INFO_TABLE
}

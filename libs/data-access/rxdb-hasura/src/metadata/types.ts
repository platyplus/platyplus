/* eslint-disable @typescript-eslint/no-explicit-any */
import type { XOR } from '@platyplus/ts-types'

import { AppConfig, AppConfigCollection } from './app-config/types'
import type {
  PropertyConfig,
  PropertyConfigCollection
} from './property-config/types'
import type { TableConfig, TableConfigCollection } from './table-config/types'
import type {
  Column,
  Relationship,
  TableInfo,
  TableInfoCollection
} from './table-information/types'
import { PagesCollection } from './page/types'
import { PROPERTY_CONFIG_TABLE } from './property-config'
import { TABLE_CONFIG_TABLE } from './table-config'
import { APP_CONFIG_TABLE } from './app-config'
import { PAGES_TABLE } from './page/constants'
import { TABLE_INFO_TABLE } from './table-information'

export type TableInformation = TableInfo

export type {
  Column,
  Relationship,
  TableInfo,
  PropertyConfig,
  TableConfig,
  AppConfig
}

export type JsonSchemaFormat =
  | 'date-time'
  | 'time'
  | 'date'
  | 'email'
  | 'hostname'
  | 'ipv4'
  | 'ipv6'
  | 'uri'

export type JsonSchemaPropertyType =
  | 'number'
  | 'object'
  | 'array'
  | 'string'
  | 'integer'
  | 'boolean'
  | 'null'

export type CustomTypes = 'collection' | 'document' | 'json' | 'uuid'

// * Field types: either core JSON formats e.g. `string` (-> without format), `object` or their format e.g. `date-time`
export type PropertyType =
  | JsonSchemaFormat
  | JsonSchemaPropertyType
  | CustomTypes

export type Property = {
  name: string
  config?: PropertyConfig
  type: PropertyType
  required: boolean
  primary: boolean
} & XOR<{ column: Column }, { relationship: Relationship }>

export type ConfigCollections = {
  [PROPERTY_CONFIG_TABLE]: PropertyConfigCollection
  [TABLE_CONFIG_TABLE]: TableConfigCollection
  [APP_CONFIG_TABLE]: AppConfigCollection
  [PAGES_TABLE]: PagesCollection
}

export type ConfigCollection =
  | TableConfigCollection
  | AppConfigCollection
  | PropertyConfigCollection
  | PagesCollection

export type PlatyplusCollections = {
  [TABLE_INFO_TABLE]: TableInfoCollection
} & ConfigCollections

export type ConfigCollectionName =
  | typeof APP_CONFIG_TABLE
  | typeof PROPERTY_CONFIG_TABLE
  | typeof TABLE_CONFIG_TABLE
  | typeof PAGES_TABLE

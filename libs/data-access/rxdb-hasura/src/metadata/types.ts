/* eslint-disable @typescript-eslint/no-explicit-any */
import type { XOR } from '@platyplus/ts-types'
import { RxCollection, RxJsonSchema } from 'rxdb'
import { DocumentNode } from 'graphql'

import { Replicator } from '../types'
import { AppConfig } from './app-config/types'
import type { PropertyConfig } from './property-config/types'
import type { TableConfig } from './table-config/types'
import type { Column, Relationship, TableInfo } from './table-information/types'
import {
  APP_CONFIG_TABLE,
  PROPERTY_CONFIG_TABLE,
  TABLE_CONFIG_TABLE,
  TABLE_INFO_TABLE
} from './utils'

export type TableInformation = TableInfo

export type CollectionSettings = {
  query: DocumentNode
  mutation?: DocumentNode
  subscription: DocumentNode
  schema: RxJsonSchema<any>
  onUpsert?: (doc: any) => void
  onDelete?: (doc: any) => void
  onWsReceive?: (doc: any[]) => void
}
export type {
  Column,
  Relationship,
  TableInfo,
  PropertyConfig,
  TableConfig,
  AppConfig
}

export type ConfigCollectionName =
  | typeof APP_CONFIG_TABLE
  | typeof PROPERTY_CONFIG_TABLE
  | typeof TABLE_CONFIG_TABLE

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

export type ReplicatedCollection<T> = RxCollection<
  T,
  Record<string, unknown>,
  { replicator: Replicator<T> }
>

export type TableInfoCollection = ReplicatedCollection<TableInfo>

export type TableConfigCollection = ReplicatedCollection<TableConfig>

export type PropertyConfigCollection = ReplicatedCollection<PropertyConfig>

export type AppConfigCollection = ReplicatedCollection<AppConfig>

export type ConfigCollection =
  | TableConfigCollection
  | AppConfigCollection
  | PropertyConfigCollection

export type PlatyplusCollections = {
  [TABLE_INFO_TABLE]: TableInfoCollection
  [PROPERTY_CONFIG_TABLE]: PropertyConfigCollection
  [TABLE_CONFIG_TABLE]: TableConfigCollection
  [APP_CONFIG_TABLE]: AppConfigCollection
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { XOR } from '@platyplus/ts-types'
import { RxCollection, RxJsonSchema } from 'rxdb'
import { DocumentNode } from 'graphql'

import { Replicator } from '../types'
import { AppConfig } from './app-config/types'
import type { PropertyConfig } from './property-config/types'
import type { TableConfig } from './table-config/types'
import type { Column, Relationship, TableInfo } from './table-information/types'

export type TableInformation = Partial<ExtendedTableInfo>

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
  | 'app_config'
  | 'property_config'
  | 'table_config'

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

export type ExtendedTableInfo = TableInfo & {
  properties: Map<string, Property>
  config?: TableConfig
}

export type Property = {
  name: string
  config?: PropertyConfig
  type: PropertyType
  required: boolean
  primary: boolean
} & XOR<{ column: Column }, { relationship: Relationship }>

export type TableInfoCollection = RxCollection<
  TableInfo,
  Record<string, unknown>,
  { replicator: Replicator }
>

export type ConfigCollection = RxCollection<
  TableConfig | AppConfig | PropertyConfig,
  Record<string, unknown>,
  { replicator: Replicator }
>

export type PlatyplusCollections = {
  table_info: TableInfoCollection
  property_config: RxCollection<PropertyConfig>
  table_config: RxCollection<TableConfig>
  app_config: RxCollection<AppConfig>
}

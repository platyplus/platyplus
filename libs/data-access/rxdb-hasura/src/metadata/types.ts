import { RxCollection } from 'rxdb'
import { ColumnFragment, TableFragment } from '../generated'
import { Replicator } from '../types'
import { AppConfig } from './config/app/types'
import { PropertyConfig } from './config/property/types'
import { TableConfig } from './config/table/types'

export type { PropertyConfig, TableConfig, AppConfig }

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

export type Metadata = Omit<TableFragment, 'dependentForeignKeys'> & {
  properties: Map<string, Property>
  config?: TableConfig
  dependentForeignKeys: {
    tableId: string
    columns: string[]
    onDelete: 'a' | 'r' | 'c' | 'n' | 'd'
    onUpdate: 'a' | 'r' | 'c' | 'n' | 'd'
  }[]
}

export type Property = {
  name: string
  column?: ColumnFragment
  relationship?: Metadata['relationships'][0] & { ref: string }
  config?: PropertyConfig
  type: PropertyType
  required: boolean
  primary: boolean
}

export type MetadataCollection = RxCollection<
  TableFragment,
  Record<string, unknown>,
  { replicator: Replicator }
>

export type MetadataCollections = {
  metadata: RxCollection<TableFragment>
  property_config: RxCollection<PropertyConfig>
  table_config: RxCollection<TableConfig>
  app_config: RxCollection<AppConfig>
}

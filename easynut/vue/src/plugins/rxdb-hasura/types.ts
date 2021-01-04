import { RxCollection, RxDocument } from 'rxdb'

export type ValuesOf<T extends unknown[]> = T[number]
export {
  TableFragment as Metadata,
  ColumnFragment,
  CoreTableFragment
} from './generated'

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
  | 'boolean'
  | 'null'

export type CustomTypes = 'collection' | 'document' | 'integer'

// * Field types: either core JSON formats e.g. `string` (-> without format), `object` or their format e.g. `date-time`
export type PropertyType =
  | JsonSchemaFormat
  | JsonSchemaPropertyType
  | CustomTypes

export type PropertyValue =
  | string
  | number
  | boolean
  | null
  | Array<GenericDocument>
  | GenericDocument

export type GenericDocument = Record<string, unknown>
// * This UnwrapRef<Ref<T>> thing is a workaround to keep Rx classes inference
export type GenericRxDocument = RxDocument<GenericDocument>
export type GenericRxCollection = RxCollection
export type Modifier = (doc: GenericDocument) => GenericDocument
export type Replicator = {
  start: () => Promise<void>
  stop: () => Promise<void>
}

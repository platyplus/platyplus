import { RxCollection, RxDocument } from 'rxdb/dist/types'
import { Ref, UnwrapRef } from 'vue'

// * Make one (or more) property optional
// See: https://stackoverflow.com/questions/43159887/make-a-single-property-optional-in-typescript
// TODO https://github.com/piotrwitek/utility-types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type ValuesOf<T extends unknown[]> = T[number]

export type GenericDocument = Record<string, unknown>
// * This UnwrapRef<Ref<T>> thing is a workaround to keep Rx classes inference
export type GenericRxDocument = RxDocument<GenericDocument>
export type GenericRxCollection = RxCollection

export type PropertyValue =
  | string
  | number
  | boolean
  | null
  | Array<GenericDocument>
  | GenericDocument

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

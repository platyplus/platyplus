import { RxCollection, RxDatabase, RxDocument } from 'rxdb'
import { BehaviorSubject } from 'rxjs'

import { TableFragment as Metadata } from './generated'
export type ValuesOf<T extends unknown[]> = T[number]

export { ColumnFragment, CoreTableFragment } from './generated'
export { Metadata }

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
  | Array<Contents>
  | Contents

export type Contents = Record<string, unknown> & {
  id: string
  updated_at?: string
}

export type ContentsDocument = RxDocument<Contents, ContentsDocumentMethods>

export type ContentsDocumentMethods = {
  canEdit: (propertyName?: string) => boolean
  canSave: () => boolean
  // ? editableProperties(): Property[]
  // ? validate(propertyName?: string) => errors or true? (or the computed values? -> TBC)
}

export type ContentsCollectionMethods = {
  title: (property?: string) => string
  description: (property?: string) => string
  documentTitle: () => string
  icon: (property?: string) => string
  defaultView: () => string
  canInsert: (propertyName?: string) => boolean
  canUpdate: (propertyName?: string) => boolean
  // ? insertableProperties(): Property[]
  // ? updatableProperties(): Property[]
}

export type ContentsCollectionPrototype = ContentsCollectionMethods & {
  metadata: Metadata
  replicator: Replicator
}

export type ContentsCollection = RxCollection<
  Contents,
  ContentsDocumentMethods,
  ContentsCollectionPrototype
>
export type MetadataCollection = RxCollection<Metadata>

export type Modifier = (
  doc: Contents
) => Contents | null | Promise<Contents | null>

export type Replicator = {
  start: () => Promise<void>
  stop: () => Promise<void>
}

export type DatabaseCollections = {
  metadata: RxCollection<Metadata>
} & Record<string, ContentsCollection>

export type Database = RxDatabase<DatabaseCollections>

export type DatabasePrototype = {
  readonly hasura: Record<string, ContentsCollection>
  readonly hasura$: BehaviorSubject<Record<string, ContentsCollection>>
  readonly setJwt: (value: string | undefined) => void
  readonly jwt$: BehaviorSubject<string | undefined>
  readonly setStatus: (value: boolean, jwt?: string) => void
  readonly status$: BehaviorSubject<boolean>
}

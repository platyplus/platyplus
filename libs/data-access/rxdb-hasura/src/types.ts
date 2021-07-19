import { PrimaryProperty, RxCollection, RxDatabase, RxDocument } from 'rxdb'
import { TopLevelProperty } from 'rxdb/dist/types/types'
import { BehaviorSubject } from 'rxjs'

import { TableFragment } from './generated'
export type ValuesOf<T extends unknown[]> = T[number]

export type { ColumnFragment, CoreTableFragment } from './generated'

export type Metadata = Pick<
  TableFragment,
  Exclude<keyof TableFragment, 'propertiesConfig'>
> & {
  propertiesConfig?: Record<string, PropertyConfig>
}

export type MetadataDocument = RxDocument<Metadata>

export type PropertyConfig = {
  title?: string
  component?: string
  description?: string
  icon?: string
  json_schema?: Record<string, unknown>
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

export type Contents = Record<string, any> & {
  id: string
  updated_at?: string
  label: string
}

export type ContentsDocument =
  | RxDocument<Contents, ContentsDocumentMethods>
  | RxDocument<Contents>

export type ContentsDocumentMethods = {
  canEdit: (propertyName?: string) => boolean
  canSave: () => boolean
  canDelete: () => boolean
  component: (propertyName?: string) => string
  propertyType: (propertyName: string) => string
  // TODO propertyComponentOptions
  // ? editableProperties(): Property[]
  // ? validate(propertyName?: string) => errors or true? (or the computed values? -> TBC)
}

export type ContentsCollectionMethods = {
  title: (property?: string) => string
  description: (property?: string) => string
  documentTitle: () => string // TODO move to prototype
  icon: (property?: string) => string
  component: () => string // TODO move to prototype
  canInsert: (propertyName?: string) => boolean
  canUpdate: (propertyName?: string) => boolean
  // ? insertableProperties(): Property[]
  // ? updatableProperties(): Property[]
}

export type ContentsCollectionPrototype = ContentsCollectionMethods & {
  role: string
  metadata: MetadataDocument
  replicator: Replicator
  properties: Map<string, TopLevelProperty | PrimaryProperty>
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

export type Roles = 'user' | 'me'

type MetadataCollections<T extends Roles> = Record<
  `${Roles | T}_metadata`,
  RxCollection<Metadata>
>
type ContentsColections = Record<string, ContentsCollection>

export type DatabaseCollections<T extends Roles = Roles> =
  MetadataCollections<T> & ContentsColections

export type Database<T extends Roles = Roles> = RxDatabase<
  DatabaseCollections<T>
>

export type DatabasePrototype = {
  // readonly contents: Record<string, ContentsCollection>
  readonly contents$: BehaviorSubject<Record<string, ContentsCollection>>
  readonly setJwt: (value: string | undefined) => void
  readonly jwt$: BehaviorSubject<string | undefined>
  readonly setAuthStatus: (value: boolean, jwt?: string) => void
  readonly authStatus$: BehaviorSubject<boolean>
}

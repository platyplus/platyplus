/* eslint-disable @typescript-eslint/ban-types */
import { RxCollection, RxDatabase, RxDocument } from 'rxdb'
import { BehaviorSubject } from 'rxjs'

import { Metadata } from './metadata'

export type ValuesOf<T extends unknown[]> = T[number]

export type { ColumnFragment, CoreTableFragment } from './generated'

export type MetadataDocument = RxDocument<Metadata>

export type PropertyValue =
  | string
  | number
  | boolean
  | null
  | Array<Contents>
  | Contents

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Contents = Record<string, any> & {
  id: string
  is_local_change?: boolean // ! used for local RxDB changes without trigerring a GraphQl replicatin (e.g. relationship sync)
  updated_at?: string
  label: string
}

export type ContentsDocument = RxDocument<Contents, ContentsDocumentMethods> & {
  collection: ContentsCollection
}

export type ContentsDocumentMethods = {}
export type ContentsCollectionMethods = {}

export type ContentsCollectionPrototype = ContentsCollectionMethods & {
  role: string
  _tableId: string
  replicator: Replicator
}

export type ContentsCollection = RxCollection<
  Contents,
  ContentsDocumentMethods,
  ContentsCollectionPrototype
>

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
export type ContentsCollections = Map<string, ContentsCollection>

export type DatabaseCollections<T extends Roles = Roles> =
  MetadataCollections<T> & ContentsCollections

export type Database<T extends Roles = Roles> = RxDatabase<
  DatabaseCollections<T>
>

export type DatabasePrototype = {
  // readonly contents: Record<string, ContentsCollection>
  readonly contents$: BehaviorSubject<Record<string, ContentsCollection>>
}

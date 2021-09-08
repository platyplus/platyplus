/* eslint-disable @typescript-eslint/ban-types */
import { RxCollection, RxDocument } from 'rxdb'
import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql'
import { RxDatabaseBase } from 'rxdb/dist/types/rx-database'
import { BehaviorSubject, Observable, Subject } from 'rxjs'

import { PlatyplusCollections, TableInfo } from './metadata'

export type ValuesOf<T extends unknown[]> = T[number]

export type { ColumnFragment, CoreTableFragment } from './generated'
export type { Column, Relationship, TableInfo } from './metadata'

export type TableInfoDocument = RxDocument<TableInfo>

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

export type ContentsDocument = RxDocument<Contents, ContentsDocumentMethods>

export type ContentsDocumentMethods = {}
export type ContentsCollectionMethods = {}

export type ContentsCollectionPrototype = ContentsCollectionMethods & {
  role: string
  tableId: string
  replicator: Replicator<Contents>
}

export type ContentsCollection = RxCollection<
  Contents,
  ContentsDocumentMethods,
  ContentsCollectionPrototype
>

export type Modifier = (
  doc: Contents
) => Contents | null | Promise<Contents | null>

export type Replicator<T> = {
  start: () => Promise<void>
  stop: () => Promise<void>
  destroy: () => Promise<void>
  state: RxGraphQLReplicationState<T>
}

export type DatabaseCollections = PlatyplusCollections &
  Record<string, ContentsCollection>

export type DatabasePrototype = {
  newCollections$: Subject<DatabaseCollections>
  isConfigReady$: Observable<boolean>
  isReady$: Observable<boolean>
  jwt$: BehaviorSubject<string | null>
  isAdmin$: BehaviorSubject<boolean>
  isAuthenticated$: BehaviorSubject<boolean>
  isConnected$: Observable<boolean>
  setAuthStatus: (status: boolean, newJwt: string, admin: boolean) => void
}

export type Database = RxDatabaseBase<unknown, unknown, DatabaseCollections> &
  DatabasePrototype

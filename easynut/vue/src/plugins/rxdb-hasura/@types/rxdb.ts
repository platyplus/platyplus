import { CollectionsOfDatabase, RxCollection } from 'rxdb'
import { BehaviorSubject } from 'rxjs'

import { Metadata, Replicator } from '../types'
declare module 'rxdb' {
  export interface RxCollectionGenerated {
    readonly metadata: Metadata
    replicator?: Replicator
    _metadata: Metadata
  }

  // export type RxCollection<
  //   RxDocumentType = any,
  //   // eslint-disable-next-line @typescript-eslint/ban-types
  //   OrmMethods = {},
  //   StaticMethods = { [key: string]: any }
  // > = RxCollectionBase<RxDocumentType, OrmMethods> &
  //   RxCollectionGenerated<RxDocumentType, OrmMethods> &
  //   StaticMethods

  export type RxDatabase<
    Collections = CollectionsOfDatabase
  > = RxDatabase<Collections> & {
    readonly metadata: RxCollection<Metadata>
    readonly hasura: Record<string, RxCollection>
    readonly hasura$: BehaviorSubject<Record<string, RxCollection>>
    readonly setJwt: (value: string | undefined) => void
    readonly jwt$: BehaviorSubject<string | undefined>
    readonly setStatus: (value: boolean, jwt?: string) => void
    readonly status$: BehaviorSubject<boolean>
  }
}

import { CollectionsOfDatabase, RxCollection } from 'rxdb'
import { Subject } from 'rxjs'

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
    readonly setJwt: (value: string) => void
    readonly jwt$: Subject<string>
  }
}

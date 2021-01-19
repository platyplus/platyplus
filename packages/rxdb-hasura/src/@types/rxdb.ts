import { CollectionsOfDatabase } from 'rxdb'

import { Database, DatabasePrototype } from '../types'
declare module 'rxdb' {
  export interface RxCollectionGenerated {
    database: Database
  }

  export type RxDatabase<Collections = CollectionsOfDatabase> = RxDatabase<
    Collections
  > &
    DatabasePrototype
}

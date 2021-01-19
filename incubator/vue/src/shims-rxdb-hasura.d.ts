import { Database, DatabasePrototype } from '@platyplus/rxdb-hasura'
import { CollectionsOfDatabase } from 'rxdb'
declare module 'rxdb' {
  export interface RxCollectionGenerated {
    database: Database
  }

  export type RxDatabase<Collections = CollectionsOfDatabase> = RxDatabase<
    Collections
  > &
    DatabasePrototype
}

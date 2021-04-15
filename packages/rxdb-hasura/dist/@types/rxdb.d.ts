import { CollectionsOfDatabase } from 'rxdb';
import { Database, DatabasePrototype } from '../types';
declare module 'rxdb' {
    interface RxCollectionGenerated {
        database: Database;
    }
    type RxDatabase<Collections = CollectionsOfDatabase> = RxDatabase<Collections> & DatabasePrototype;
}

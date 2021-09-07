import { useEffect, useMemo, useState } from 'react'
import { RxCollection } from 'rxdb'
import { useRxDB, useRxCollection } from 'rxdb-hooks'

import {
  collectionName,
  Database,
  TableInformation
} from '@platyplus/rxdb-hasura'
import { filter } from 'rxjs'

export const useCollectionName = (tableInfo: TableInformation, role: string) =>
  useMemo(() => tableInfo && collectionName(tableInfo, role), [tableInfo, role])

// TODO remove https://github.com/cvara/rxdb-hooks/pull/36
export const useCollection = (name: string) => {
  const db: Database = useRxDB()
  const [collection, setCollection] = useState<RxCollection>()
  const initialCollection = useRxCollection(name)
  useEffect(() => {
    if (db[name]) {
      setCollection(db[name])
    } else {
      // * See https://github.com/cvara/rxdb-hooks/blob/master/src/plugins.ts
      const subscription = db.newCollections$
        .pipe(filter((event) => !!event[name]))
        .subscribe((event) => setCollection(event[name]))
      return () => subscription.unsubscribe()
    }
  }, [name, db, initialCollection])
  return collection
}

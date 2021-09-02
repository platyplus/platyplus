import { useEffect, useMemo, useState } from 'react'
import { RxCollection } from 'rxdb'
import { useRxDB, useRxCollection } from 'rxdb-hooks'

import { collectionName, Database, Metadata } from '@platyplus/rxdb-hasura'

export const useCollectionName = (metadata: Metadata, role: string) =>
  useMemo(() => metadata && collectionName(metadata, role), [metadata, role])

  // TODO remove https://github.com/cvara/rxdb-hooks/pull/36
export const useCollection = (name: string) => {
  const db: Database = useRxDB()
  const [collection, setCollection] = useState<RxCollection>()
  const initialCollection = useRxCollection(name)
  useEffect(() => {
    if (db[name]) {
      setCollection(db[name])
      // * See https://github.com/cvara/rxdb-hooks/blob/master/src/plugins.ts
      const subscription = db.newCollections$.subscribe((event: Database) => {
        if (event[name]) {
          setCollection(event[name])
        }
      })
      return () => subscription.unsubscribe()
    } else {
      setCollection(initialCollection)
    }
  }, [name, db, initialCollection])
  return collection
}

import { useEffect, useMemo, useState } from 'react'
import { CollectionsOfDatabase } from 'rxdb'

import { ContentsCollection } from '@platyplus/rxdb-hasura'

import { useDB } from './database'

export type Collections = Record<string, ContentsCollection>

export const useContentsCollections = (): Collections => {
  const db = useDB()
  const [collections, setCollections] = useState<CollectionsOfDatabase>({})
  const initialCollections = useMemo(() => db?.collections, [db])
  useEffect(() => {
    if (db) {
      setCollections(db.collections)
      const subscription = db.contents$.subscribe((value) =>
        setCollections({ ...db.collections, ...value })
      )
      return () => subscription.unsubscribe()
    }
  }, [db, initialCollections])
  return collections as Collections
}

export const useContentsCollection = (name: string) => {
  const collections = useContentsCollections()
  const [collection, setCollection] = useState<ContentsCollection>()
  useEffect(() => {
    if (collections[name]) {
      setCollection(collections[name])
    }
  }, [collections, name])
  return collection
}

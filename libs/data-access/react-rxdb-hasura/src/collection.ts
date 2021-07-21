import { useEffect, useMemo, useState } from 'react'

import {
  ContentsCollection,
  ContentsCollections,
  isManyToManyTable
} from '@platyplus/rxdb-hasura'

import { useDB } from './database'

export const useContentsCollections = (): ContentsCollections => {
  const db = useDB()
  const [allCollections, setCollections] = useState<ContentsCollections>({})

  useEffect(() => {
    if (db) {
      setCollections(db.collections)
      const subscription = db.contents$.subscribe((value) =>
        setCollections((prev) => ({ ...prev, ...value }))
      )
      return () => subscription.unsubscribe()
    }
  }, [db])

  const collections: ContentsCollections = useMemo(
    () =>
      Object.entries(allCollections)
        .filter(([, value]) => value.metadata)
        .reduce((acc, [key, value]) => {
          acc[key] = value
          return acc
        }, {}),
    [allCollections]
  )
  return collections
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

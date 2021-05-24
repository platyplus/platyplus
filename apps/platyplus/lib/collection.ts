import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { useEffect, useState } from 'react'
import { useRxData } from 'rxdb-hooks'
import { useDB } from './database'

export type Collections = Record<string, ContentsCollection>

export const useContentsCollections = (): Collections => {
  const db = useDB()
  const [collections, setCollections] = useState<Collections>({})
  useEffect(() => {
    if (db) {
      const subscription = db.contents$.subscribe((value) =>
        setCollections({ ...collections, ...value })
      )
      return () => subscription.unsubscribe()
    }
  }, [db])
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

export const useSingleton = (
  collectionName: string
): Readonly<ContentsDocument | undefined> => {
  const [document, setDocument] = useState<ContentsDocument | undefined>()
  const { result } = useRxData<ContentsDocument>(collectionName, (collection) =>
    collection.find().limit(1)
  )
  useEffect(() => {
    setDocument(result[0])
  }, [result])
  return document
}

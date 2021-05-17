import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { useEffect, useState } from 'react'
import { map } from 'rxjs/operators'

import { useDB } from './rxdb-hasura-provider'
export type Collections = Record<string, ContentsCollection>
export const useCollection = (name: string): ContentsCollection | undefined => {
  const collections = useCollections()
  const [collection, setCollection] = useState<ContentsCollection>()
  useEffect(() => {
    setCollection(collections?.[name])
  }, [collections, name])
  return collection
}

export const useDocumentCollection = (
  document: ContentsDocument
): ContentsCollection => {
  const [collection, setCollection] = useState<ContentsCollection>()
  useEffect(() => {
    setCollection(document.collection as ContentsCollection)
  }, [document])
  return collection
}

export const useCollections = (): Collections => {
  const db = useDB()
  const [collections, setCollections] = useState<Collections>({})
  useEffect(() => {
    if (db) {
      const subscription = db.contents$.subscribe((value) =>
        setCollections(value)
      )
      return () => subscription.unsubscribe()
    }
  }, [db])
  return collections
}

export const useSingleton = (
  collectionName: string
): Readonly<ContentsDocument | undefined> => {
  const [document, setDocument] = useState<ContentsDocument | undefined>()
  const collection = useCollection(collectionName)
  useEffect(() => {
    const subscription = collection
      .find()
      .limit(1)
      .$.pipe(map((x) => x[0]))
      .subscribe((value) => setDocument(value))
    return () => subscription.unsubscribe()
  }, [collection])

  return document
}

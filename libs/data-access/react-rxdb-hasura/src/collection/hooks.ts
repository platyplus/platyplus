import { useState, useEffect, useCallback, useMemo } from 'react'

import {
  collectionName,
  Contents,
  ContentsCollections,
  ContentsDocument,
  Metadata,
  populateDocument
} from '@platyplus/rxdb-hasura'

import { useDB } from '../database'
import { useAppConfig } from '../config'
import { useRxCollection, useRxQuery } from 'rxdb-hooks'
import { RxQuery } from 'rxdb'

export const useCollectionName = (metadata: Metadata, role: string) =>
  useMemo(() => metadata && collectionName(metadata, role), [metadata, role])

export const usePopulatedCollection = (name: string, query?: RxQuery) => {
  const collection = useRxCollection(name)
  const q = useMemo(
    () => query || collection?.find().sort('label'),
    [query, collection]
  )
  const [populating, setPopulating] = useState<boolean>()
  const {
    isFetching: isQueryFetching,
    result: rawResult,
    ...rest
  } = useRxQuery<Contents>(q)
  const [result, setResult] = useState<Contents[]>([])
  useEffect(() => {
    const populate = async () => {
      setPopulating(true)
      setResult(
        await Promise.all(
          rawResult.map(
            async (doc) => await populateDocument(doc as ContentsDocument)
          )
        )
      )
      setPopulating(false)
    }
    populate()
  }, [rawResult])
  const isFetching = useMemo(
    () => isQueryFetching || populating,
    [isQueryFetching, populating]
  )
  return { isFetching, result, ...rest }
}

/**
 *
 * @param me include `me` collections in the result
 * @returns
 */
export const useContentsCollections = (me = false): ContentsCollections => {
  const db = useDB()
  const [collections, setCollections] = useState<ContentsCollections>(new Map())

  const filter = useCallback(
    ([key, value]) => value._tableId && (me || !key.startsWith('me_')),
    [me]
  )

  useEffect(() => {
    if (db) {
      setCollections(new Map(Object.entries(db.collections).filter(filter)))
      const subscription = db.contents$.subscribe((newValues) =>
        setCollections(
          (prev) =>
            new Map([
              ...prev.entries(),
              ...Object.entries(newValues).filter(filter)
            ])
        )
      )
      return () => subscription.unsubscribe()
    }
  }, [db, filter])

  return collections
}

/**
 *
 * @param showMissing also include collections that are not part of the order list
 * @returns
 */
export const useOrderedContentsCollections = (
  includeMissing = false
): [ContentsCollections | null, (val: ContentsCollections) => void] => {
  const [appConfig, setAppConfig] = useAppConfig()
  const collections = useContentsCollections()

  const orderedCollections = useMemo(() => {
    const order: string[] | null = appConfig?.menu_order
    if (order) {
      const from = new Map(collections)
      const result = new Map()
      for (const key of order) {
        const newValue = from.get(key)
        if (newValue) {
          result.set(key, newValue)
          from.delete(key)
        }
      }
      if (includeMissing) {
        for (const [key, value] of from) {
          result.set(key, value)
        }
      }
      return result
    } else return collections
  }, [collections, appConfig, includeMissing])

  const setCollectionsOrder = useCallback(
    (val: ContentsCollections) => {
      setAppConfig({ menu_order: [...val.keys()] })
    },
    [setAppConfig]
  )

  return [orderedCollections, setCollectionsOrder]
}

export const useContentsCollection = (name: string) => {
  const collections = useContentsCollections(true)
  const collection = useMemo(() => collections.get(name), [collections, name])
  return collection
}

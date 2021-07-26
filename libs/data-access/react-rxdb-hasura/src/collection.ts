import { useCallback, useEffect, useMemo, useState } from 'react'

import { ContentsCollections } from '@platyplus/rxdb-hasura'

import { useDB } from './database'
import { useAppConfig } from './config'

/**
 *
 * @param me include `me` collections in the result
 * @returns
 */
export const useContentsCollections = (me = false): ContentsCollections => {
  const db = useDB()
  const [collections, setCollections] = useState<ContentsCollections>(new Map())

  const filter = useCallback(
    ([key, value]) => value.metadata && (me || !key.startsWith('me_')),
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
  const collections = useContentsCollections()
  const collection = useMemo(() => collections.get(name), [collections, name])
  return collection
}

import { TopLevelProperty } from 'rxdb/dist/types/types'
import { useCallback } from 'react'

import {
  ContentsCollection,
  ContentsDocument,
  Metadata,
  MetadataDocument,
  PropertyConfig
} from '@platyplus/rxdb-hasura'

import { useCollectionMetadata } from '../collection'
import { useConfigStore } from '../store'

type PropertiesType = Map<string, TopLevelProperty>

export const useCollectionProperties = (
  collection: ContentsCollection
): [PropertiesType | null, (val: PropertiesType) => void] => {
  const metadata = useCollectionMetadata(collection)

  const properties = useConfigStore(
    useCallback(
      (state) => {
        if (collection?.properties) {
          const result = new Map<string, TopLevelProperty>()
          const tempProperties = new Map(collection.properties)
          const order = state.getTable<string[]>(metadata, 'order') || []
          for (const property of order) {
            result.set(property, tempProperties.get(property))
            tempProperties.delete(property)
          }
          return new Map([...result, ...tempProperties])
        } else return null
      },
      [collection, metadata]
    )
  )
  const setProperties = useConfigStore(
    (state) => (newProperties: PropertiesType) =>
      state.setTable(metadata, [...newProperties.keys()], 'order')
  )

  return [properties, setProperties]
}

export const useDocumentProperties = (document?: ContentsDocument) =>
  useCollectionProperties(document?.collection)

type FallbackFunction<T> = (metadata?: Metadata) => T
export const usePropertyConfig = <T = PropertyConfig>(
  metadata: Metadata | MetadataDocument | undefined,
  property: string,
  path?: string,
  fallback?: T | FallbackFunction<T>
): [T, (val: T) => void] => {
  const state = useConfigStore(
    useCallback(
      (state) =>
        metadata &&
        (state.getProperty<T>(metadata, property, path) ||
          (typeof fallback === 'function'
            ? (fallback as FallbackFunction<T>)(metadata)
            : fallback)),
      [metadata, fallback, path, property]
    )
  )
  const setState = useConfigStore(
    (state) => (value: T) => state.setProperty(metadata, property, value, path)
  )
  return [state, setState]
}

export const useCollectionPropertyConfig = <T = PropertyConfig>(
  collection: ContentsCollection,
  property: string,
  path?: string,
  fallback?: T | FallbackFunction<T>
) => {
  const metadata = useCollectionMetadata(collection)
  return usePropertyConfig(metadata, property, path, fallback)
}

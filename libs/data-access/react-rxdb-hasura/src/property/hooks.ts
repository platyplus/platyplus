import { TopLevelProperty } from 'rxdb/dist/types/types'
import { useCallback, useMemo } from 'react'

import {
  ContentsCollection,
  Contents,
  Metadata,
  MetadataDocument,
  PropertyConfig,
  PROPERTY_CONFIG_COLLECTION
} from '@platyplus/rxdb-hasura'

import { useCollectionMetadata } from '../collection'
import { useConfig, useTableConfig } from '../config'

type PropertiesType = Map<string, TopLevelProperty>

export const useCollectionProperties = (
  collection: ContentsCollection
): [PropertiesType | null, (val: PropertiesType) => void] => {
  const metadata = useCollectionMetadata(collection)
  const [order, setOrder] = useTableConfig<string[]>(metadata, 'order')

  const properties = useMemo(() => {
    if (collection?.properties) {
      const result = new Map<string, TopLevelProperty>()
      const tempProperties = new Map(collection.properties)
      if (order)
        for (const property of order) {
          result.set(property, tempProperties.get(property))
          tempProperties.delete(property)
        }
      return new Map([...result, ...tempProperties])
    } else return null
  }, [collection, order])

  const setProperties = useCallback(
    (newProperties: PropertiesType) => setOrder([...newProperties.keys()]),
    [setOrder]
  )

  return [properties, setProperties]
}

export const useDocumentProperties = (document?: Contents) =>
  useCollectionProperties(document?.collection)

export const usePropertyConfig = <T = PropertyConfig>(
  metadata: Metadata | MetadataDocument | undefined,
  property: string,
  path?: string,
  fallback?: T
): [T, (val: T) => void] => {
  const id = useMemo(
    () => metadata && `${metadata.id}.${property}`,
    [metadata, property]
  )
  return useConfig(PROPERTY_CONFIG_COLLECTION, id, path, fallback)
}

export const useCollectionPropertyConfig = <T = PropertyConfig>(
  collection: ContentsCollection,
  property: string,
  path?: string,
  fallback?: T
) => {
  const metadata = useCollectionMetadata(collection)
  return usePropertyConfig(metadata, property, path, fallback)
}

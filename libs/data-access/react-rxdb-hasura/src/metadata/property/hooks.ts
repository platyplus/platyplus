import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'
import { useCallback } from 'react'

import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'

import { useCollectionMetadata } from '../collection'
import { useConfigStore } from '../store'

type PropertiesType = Map<string, PrimaryProperty | TopLevelProperty>
export const useCollectionProperties = (
  collection: ContentsCollection
): [PropertiesType | null, (val: PropertiesType) => void] => {
  const metadata = useCollectionMetadata(collection)

  const properties = useConfigStore(
    useCallback(
      (state) => {
        if (collection?.properties) {
          const result = new Map<string, PrimaryProperty | TopLevelProperty>()
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
  useCollectionProperties(document?.collection as ContentsCollection)

export const useCollectionPropertyConfig = (
  collection: ContentsCollection,
  property: string
) => {
  const metadata = useCollectionMetadata(collection)
  return metadata?.propertiesConfig?.[property]
}
export const useDocumentPropertyConfig = (
  document: ContentsDocument,
  property: string
) =>
  useCollectionPropertyConfig(
    document.collection as ContentsCollection,
    property
  )

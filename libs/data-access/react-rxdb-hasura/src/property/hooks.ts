import { TopLevelProperty } from 'rxdb/dist/types/types'
import { useCallback, useMemo } from 'react'

import {
  ContentsCollection,
  Contents,
  Metadata,
  MetadataDocument,
  PropertyConfig
} from '@platyplus/rxdb-hasura'

import { useCollectionMetadata, useCollectionTableConfig } from '../collection'
import { useMetadataStore } from '../metadata'
import { useStore } from '../store'

type PropertiesType = Map<string, TopLevelProperty>

export const useCollectionProperties = (
  collection: ContentsCollection
): [PropertiesType | null, (val: PropertiesType) => void] => {
  const [order, setOrder] = useCollectionTableConfig<string[]>(
    collection,
    'order'
  )

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
  // TODO
  const initialValues = useMetadataStore(
    useCallback((state) => (id && state.config.properties[id]) || {}, [id])
  )
  const modifiedValues = useStore(
    useCallback((state) => (id && state.forms.property_config[id]) || {}, [id])
  )
  const state = useMemo(() => {
    if (path) {
      return (
        (path in modifiedValues ? modifiedValues[path] : initialValues[path]) ||
        fallback
      )
    } else return { ...initialValues, ...modifiedValues }
  }, [modifiedValues, initialValues, path, fallback])
  const setState = useStore(
    useCallback(
      (state) => (value: T) =>
        state.setConfigForm('property_config', value, id, path),
      [path, id]
    )
  )
  return [state, setState]
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

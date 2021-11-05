import { useCallback, useMemo } from 'react'

import {
  TableInformation,
  TableInfoDocument,
  PropertyConfig,
  Property,
  SYSTEM_COLUMNS,
  tableProperties,
  PROPERTY_CONFIG_TABLE
} from '@platyplus/rxdb-hasura'

import { useStore } from '../store'
import { useTableConfig } from '../config'
import { useRxDocument } from 'rxdb-hooks'

export const usePropertyConfig = <T = PropertyConfig>(
  tableInfo: TableInformation | TableInfoDocument | undefined,
  property: string,
  path?: string,
  fallback?: T
): [T, (val: T) => void] => {
  const id = useMemo(() => `${tableInfo.id}.${property}`, [tableInfo, property])

  const { result: initialValues } = useRxDocument<PropertyConfig>(
    PROPERTY_CONFIG_TABLE,
    `${tableInfo.id}.${property}`,
    { json: true }
  )

  const modifiedValues = useStore(
    useCallback(
      (state) => (id && state.forms[PROPERTY_CONFIG_TABLE][id]) || {},
      [id]
    )
  )
  const state = useMemo(() => {
    if (path) {
      return (
        (path in modifiedValues
          ? modifiedValues[path]
          : initialValues?.[path]) || fallback
      )
    } else return { ...(initialValues || {}), ...modifiedValues }
  }, [modifiedValues, initialValues, path, fallback])
  const setState = useStore(
    useCallback(
      (state) => (value: T) =>
        state.setConfigForm(PROPERTY_CONFIG_TABLE, value, id, path),
      [path, id]
    )
  )
  return [state, setState]
}

export const useCollectionPropertyConfig = <T = PropertyConfig>(
  tableInfo: TableInformation,
  property: string,
  path?: string,
  fallback?: T
) => {
  return usePropertyConfig(tableInfo, property, path, fallback)
}

export const useTableProperties = (
  tableInfo?: TableInformation,
  options?: { all?: boolean; role?: string; order?: boolean }
): [Map<string, Property>, (val: Map<string, Property>) => void] => {
  const state = useMemo(() => tableProperties(tableInfo), [tableInfo])

  const { state: order, setState: setOrder } = useTableConfig<string[]>(
    tableInfo?.id,
    'order'
  )

  const properties = useMemo(() => {
    if (state) {
      const result = new Map<string, Property>()
      const tempProperties = new Map(state)
      if (options?.all !== true) {
        for (const id of [...SYSTEM_COLUMNS, 'created_at']) {
          tempProperties.delete(id)
        }
      }
      if (options?.order !== false && order)
        for (const property of order) {
          if (tempProperties.has(property)) {
            result.set(property, tempProperties.get(property))
            tempProperties.delete(property)
          }
        }
      return new Map(
        [...result, ...tempProperties].filter(([, { relationship }]) => {
          if (relationship) {
            // * Filter out relationships that points to a non-existing remote table e.g. users.account
            return true
          } else return true
        })
      )
    } else return null
  }, [state, order, options])

  const setProperties = useCallback(
    (newProperties: Map<string, Property>) =>
      setOrder([...newProperties.keys()]),
    [setOrder]
  )

  return [properties, setProperties]
}

import { useCallback, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'

import {
  AppConfig,
  APP_CONFIG_TABLE,
  TableConfig,
  TABLE_CONFIG_TABLE
} from '@platyplus/rxdb-hasura'

import { useStore } from '../store'
import { useRxDocument } from 'rxdb-hooks'
import { useSingleton } from '../document/singleton'

export const useAppConfig = (): {
  state: AppConfig
  setState: (v: Partial<AppConfig>) => void
  isFetching: boolean
} => {
  const [newId] = useState(uuid())

  const { value: initialValues, isFetching } =
    useSingleton<AppConfig>(APP_CONFIG_TABLE)

  const id = useMemo(() => initialValues?.id || newId, [initialValues, newId])

  const modifiedValues = useStore(
    (state) =>
      (state.forms[APP_CONFIG_TABLE] &&
        Object.values(state.forms[APP_CONFIG_TABLE])[0]) ||
      {}
  )

  const state = useMemo(
    () => ({ ...(initialValues?.toJSON() || {}), ...modifiedValues }),
    [modifiedValues, initialValues]
  ) as AppConfig

  const setState = useStore(
    useCallback(
      (state) => (value: AppConfig) => {
        const currentValue = state.forms[APP_CONFIG_TABLE][0] || {}
        state.setConfigForm(APP_CONFIG_TABLE, { ...currentValue, ...value }, id)
      },
      [id]
    )
  )
  return { state, setState, isFetching }
}

export const useTableConfig = <T = TableConfig>(
  tableId?: string,
  path?: string,
  fallback?: T
): { state: T; setState: (v: T) => void; isFetching: boolean } => {
  const { result: initialValues, isFetching } = useRxDocument<TableConfig>(
    TABLE_CONFIG_TABLE,
    tableId,
    { json: true }
  )

  const modifiedValues = useStore(
    useCallback(
      (state) => (tableId && state.forms[TABLE_CONFIG_TABLE][tableId]) || {},
      [tableId]
    )
  )
  const state = useMemo(() => {
    if (path) {
      return (
        (path in modifiedValues
          ? modifiedValues[path]
          : initialValues?.[path]) ?? fallback
      )
    } else return { ...(initialValues || {}), ...modifiedValues }
  }, [modifiedValues, initialValues, path, fallback])

  const setState = useStore(
    useCallback(
      (state) => (value: T) =>
        state.setConfigForm(TABLE_CONFIG_TABLE, value, tableId, path),
      [tableId, path]
    )
  )
  return { state, setState, isFetching }
}

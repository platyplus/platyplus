import { useCallback, useEffect, useMemo, useState } from 'react'
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
  state: Partial<AppConfig>
  setState: (v: Partial<AppConfig>) => void
  isFetching: boolean
} => {
  const [newId] = useState(uuid())

  const { value: existingValues, isFetching } =
    useSingleton<AppConfig>(APP_CONFIG_TABLE)

  const [values, setValues] = useState<Partial<AppConfig>>({})

  useEffect(() => {
    if (existingValues) {
      const subscription = existingValues.$.subscribe((data) => {
        setValues((previous) => ({ ...data, ...previous }))
      })
      return () => subscription.unsubscribe()
    }
  }, [existingValues])

  const id = useMemo(() => values?.id || newId, [values, newId])

  useEffect(
    () =>
      useStore.subscribe(
        (state) => Object.values(state.forms[APP_CONFIG_TABLE])[0],
        (data) => {
          data && setValues({ ...values, ...data })
        },
        {}
      ),
    [values]
  )

  const setState = useStore(
    useCallback(
      (state) => (value: AppConfig) => {
        const currentValue = state.forms[APP_CONFIG_TABLE][0] || {}
        state.setConfigForm(APP_CONFIG_TABLE, { ...currentValue, ...value }, id)
      },
      [id]
    )
  )
  return { state: values, setState, isFetching }
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

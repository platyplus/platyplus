import { useCallback, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useLocation } from 'react-use'

import { useUserIsAdmin } from '@platyplus/hbp'
import {
  AppConfig,
  CONFIG_TABLES,
  ContentsCollection
} from '@platyplus/rxdb-hasura'

import { useStore } from './store'
import { useDB } from './database'
import { useTableInfoStore } from './metadata'

export const useConfigEnabled = () => {
  const admin = useUserIsAdmin()
  const location = useLocation()
  // TODO ping localhost:9693
  return location.hostname === 'localhost' || admin
}

export const useAppConfig = (): [
  AppConfig,
  (val: Partial<AppConfig>) => void
] => {
  const [newId] = useState(uuid())
  const id = useTableInfoStore(
    useCallback((state) => state.app?.id || newId, [newId])
  )

  const initialValues = useTableInfoStore((state) => state.app || {})

  const modifiedValues = useStore((state) => state.forms.app_config[id] || {})

  const config = useMemo(
    () => ({ ...initialValues, ...modifiedValues }),
    [modifiedValues, initialValues]
  ) as AppConfig

  const setConfig = useStore(
    useCallback(
      (state) => (value: AppConfig) =>
        state.setConfigForm('app_config', value, id),
      [id]
    )
  )
  return [config, setConfig]
}

export const useConfig = <T>(
  tableId?: string,
  path?: string,
  fallback?: T
): [T, (val: T) => void] => {
  const initialValues = useTableInfoStore(
    useCallback(
      (state) => (tableId && state.tables[tableId]?.config) || {},
      [tableId]
    )
  )

  const modifiedValues = useStore(
    useCallback(
      (state) => (tableId && state.forms.table_config[tableId]) || {},
      [tableId]
    )
  )

  const state = useMemo(() => {
    if (path) {
      return (
        (path in modifiedValues ? modifiedValues[path] : initialValues[path]) ??
        fallback
      )
    } else return { ...initialValues, ...modifiedValues }
  }, [modifiedValues, initialValues, path, fallback])

  const setState = useStore(
    useCallback(
      (state) => (value: T) =>
        state.setConfigForm('table_config', value, tableId, path),
      [tableId, path]
    )
  )
  return [state, setState]
}

export const useCountConfigChanges = () =>
  useStore(
    (state) =>
      CONFIG_TABLES.reduce((acc, name) => {
        acc += Object.keys(state.forms[name]).length
        return acc
      }, 0) || false
  )

export const usePersistConfig = () => {
  const forms = useStore((state) => state.forms)
  const clearConfig = useStore((state) => state.clearConfig)
  const db = useDB()
  return useCallback(async () => {
    for (const collectionName of CONFIG_TABLES) {
      if (forms[collectionName]) {
        const collection: ContentsCollection = db[collectionName]
        for (const [id, value] of Object.entries(forms[collectionName])) {
          const doc = await collection.findOne(id).exec()
          if (doc) await doc.atomicPatch(value)
          else collection.atomicUpsert({ id, ...value })
        }
      }
    }
    clearConfig()
  }, [forms, db, clearConfig])
}

import { useCallback, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { useAuthenticated, useUserIsAdmin } from '@platyplus/hbp'
import {
  AppConfig,
  APP_CONFIG_TABLE,
  CONFIG_TABLES,
  ContentsCollection,
  createSqlConfigInstruction,
  createSqlMigrations,
  isConsoleEnabled,
  TableConfig,
  TableInformation,
  TABLE_CONFIG_TABLE,
  TABLE_INFO_TABLE
} from '@platyplus/rxdb-hasura'

import { useStore } from './store'
import { useDB } from './database'
import { useRxDocument, useRxQuery } from 'rxdb-hooks'
import { useSingleton } from './document/singleton'
import { useCollection } from './collection'

export const useConfigEnabled = () => {
  const auth = useAuthenticated()
  const admin = useUserIsAdmin()
  const consoleEnabled = isConsoleEnabled()
  return auth && (consoleEnabled || admin)
}

export const useAppConfig = (): [
  AppConfig,
  (val: Partial<AppConfig>) => void
] => {
  const [newId] = useState(uuid())

  const { value: initialValues } = useSingleton<AppConfig>(APP_CONFIG_TABLE)

  const id = useMemo(() => initialValues?.id || newId, [initialValues, newId])

  const modifiedValues = useStore(
    (state) =>
      (state.forms[APP_CONFIG_TABLE] &&
        Object.values(state.forms[APP_CONFIG_TABLE])[0]) ||
      {}
  )

  const config = useMemo(
    () => ({ ...(initialValues?.toJSON() || {}), ...modifiedValues }),
    [modifiedValues, initialValues]
  ) as AppConfig

  const setConfig = useStore(
    useCallback(
      (state) => (value: AppConfig) =>
        state.setConfigForm(APP_CONFIG_TABLE, value, id),
      [id]
    )
  )
  return [config, setConfig]
}

export const useTableConfig = <T = TableConfig>(
  tableId?: string,
  path?: string,
  fallback?: T
): [T, (val: T) => void] => {
  const { result: initialValues } = useRxDocument<TableConfig>(
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
    // * Create batch SQL migration instructions of every changed config item
    const migrations = CONFIG_TABLES.reduce(
      (aggr, collectionName) => [
        ...aggr,
        ...Object.entries(forms[collectionName]).map(([id, value]) =>
          createSqlConfigInstruction(collectionName, { id, ...value })
        )
      ],
      []
    )
    if (migrations.length)
      try {
        // * Try to migrate through the console.
        // * If it succeeds, the GraphQL replication-subscription will send back the updated documents
        await createSqlMigrations(migrations)
      } catch {
        // * If the migration fails, fall back to the regular RxDB way of saving+replicating documents
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
      }
    clearConfig()
  }, [forms, db, clearConfig])
}

export const useTablesConfig = () => {
  const collection = useCollection(TABLE_INFO_TABLE)
  const q = useMemo(() => collection?.find(), [collection])
  const { result } = useRxQuery<TableInformation>(q)
  return result
}

import { useCallback, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useLocation } from 'react-use'

import { useUserIsAdmin } from '@platyplus/hbp'
import {
  CONFIG_TABLES,
  Contents,
  ContentsCollection
} from '@platyplus/rxdb-hasura'

import { useStore } from './store'
import { useDB } from './database'
import { useMetadataStore } from './metadata'

export const useConfigEnabled = () => {
  const admin = useUserIsAdmin()
  const location = useLocation()
  // TODO ping localhost:9693
  return location.hostname === 'localhost' || admin
}

export const useAppConfig = (): [
  Contents,
  (val: Partial<Contents>) => void
] => {
  const [newId] = useState(uuid())
  const id = useMetadataStore(
    useCallback((state) => state.app?.id || newId, [newId])
  )

  const initialValues = useMetadataStore((state) => state.app || {})

  const modifiedValues = useStore(
    useCallback((state) => state.forms.app_config[id] || {}, [id])
  )

  const config = useMemo(() => {
    return { ...initialValues, ...modifiedValues }
  }, [modifiedValues, initialValues]) as Contents

  const setConfig = useStore(
    useCallback(
      (state) => (value) => {
        return state.setConfigForm('app_config', value, id)
      },
      [id]
    )
  )

  return [config, setConfig]
}

export const useMetadataConfig = <T>(
  metadataId?: string,
  path?: string,
  fallback?: T
): [T, (val: T) => void] => {
  const initialValues = useMetadataStore(
    useCallback(
      (state) => (metadataId && state.tables[metadataId]?.config) || {},
      [metadataId]
    )
  )

  const modifiedValues = useStore(
    useCallback(
      (state) => (metadataId && state.forms.table_config[metadataId]) || {},
      [metadataId]
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
        state.setConfigForm('table_config', value, metadataId, path),
      [metadataId, path]
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

import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-use'

import { useUserIsAdmin } from '@platyplus/hbp'

import {
  APP_CONFIG_COLLECTION,
  ConfigCollectionName,
  CONFIG_COLLECTIONS,
  Contents,
  ContentsCollection,
  ContentsDocument,
  Metadata,
  MetadataDocument,
  TABLE_CONFIG_COLLECTION
} from '@platyplus/rxdb-hasura'

import { useContentsCollection } from './collection'
import { useSingleton } from './document'
import { useStore } from './store'
import { useDB } from './database'

export const useConfigEnabled = () => {
  // TODO ping localhost:9693
  const admin = useUserIsAdmin()
  const location = useLocation()
  return location.hostname === 'localhost' || admin
}

export const useAppConfig = (): [
  Contents,
  (val: Partial<Contents>) => void
] => {
  const { isFetching, document } = useSingleton(APP_CONFIG_COLLECTION)

  const collection = useContentsCollection(APP_CONFIG_COLLECTION)
  const [configDocument, setConfigDocument] = useState<ContentsDocument>()
  const [config, setConfig] = useConfig<Contents>(
    APP_CONFIG_COLLECTION,
    configDocument?.id
  )
  useEffect(
    () =>
      setConfigDocument(
        document || (collection?.newDocument() as ContentsDocument)
      ),
    [isFetching, document, collection]
  )
  return [config, setConfig]
}

export const useTableConfig = <T>(
  metadata?: MetadataDocument | Metadata,
  path?: string,
  fallback?: T
): [T, (val: T) => void] =>
  useConfig(TABLE_CONFIG_COLLECTION, metadata?.id, path, fallback)

export const useCountConfigChanges = () =>
  useStore(
    (state) =>
      CONFIG_COLLECTIONS.reduce((acc, name) => {
        acc += Object.keys(state.forms[name]).length
        return acc
      }, 0) || false
  )

export const usePersistConfig = () => {
  const forms = useStore((state) => state.forms)
  const clearConfig = useStore((state) => state.clearConfig)
  const db = useDB()
  return useCallback(async () => {
    for (const collectionName of CONFIG_COLLECTIONS) {
      if (forms[collectionName]) {
        const collection: ContentsCollection = db[collectionName]
        for (const [id, value] of Object.entries(forms[collectionName])) {
          const doc = await collection.findOne(id).exec()
          if (doc) await doc.atomicPatch(value)
          else collection.atomicUpsert({ id, ...value })
        }
        // * Doesn't work as collection.[atomic]Upsert won't send 'updated_at' to the replicator,
        // * therefore it's impossible to determine if the doc needs to be inserted or updated
        // Object.entries(forms[collectionName]).forEach(([id, value]) => {
        //   collection.atomicUpsert({ id, ...value })
        // })
      }
    }
    clearConfig()
  }, [forms, db, clearConfig])
}

export const useConfig = <T>(
  table: ConfigCollectionName,
  id?: string,
  path?: string,
  fallback?: T
): [T, (val: T) => void] => {
  const state = useStore(
    useCallback(
      (state) => state.getConfig<T>(table, id, path) ?? fallback,
      [table, id, path, fallback]
    )
  )

  const setState = useStore(
    (state) => (value: T) => state.setConfigForm(table, value, id, path)
  )
  return [state, setState]
}

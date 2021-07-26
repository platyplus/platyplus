import {
  CONFIG_TABLES,
  Contents,
  ContentsCollection,
  ContentsDocument
} from '@platyplus/rxdb-hasura'
import { useCallback, useEffect, useState } from 'react'
import { useContentsCollection } from './collection'
import { useDB } from './database'
import { useFormGet, useFormSet, useFormStore } from './form'
import { useSingleton } from './singleton'

export const useAppConfig = (): [
  Contents,
  (val: Partial<Contents>) => void
] => {
  const { isFetching, document } = useSingleton('me_metadata_app_config')
  const collection = useContentsCollection('me_metadata_app_config')
  const [configDocument, setConfigDocument] = useState<ContentsDocument>()
  const config = useFormGet(configDocument)
  const setConfig = useFormSet(configDocument)
  useEffect(
    () =>
      setConfigDocument(
        document || (collection?.newDocument() as ContentsDocument)
      ),
    [isFetching, document, collection]
  )
  return [config, setConfig]
}

export const useCountConfigChanges = () =>
  useFormStore(
    (state) =>
      CONFIG_TABLES.map((name) => `me_${name}`).reduce((acc, name) => {
        if (state.forms[name]) acc += Object.keys(state.forms[name]).length
        return acc
      }, 0) || false
  )

export const useSaveConfig = () => {
  const forms = useFormStore((state) => state.forms)
  const clearConfig = useFormStore((state) => state.clearConfig)
  const db = useDB()
  return useCallback(async () => {
    CONFIG_TABLES.map((name) => `me_${name}`)
    for (const collectionName of CONFIG_TABLES.map((name) => `me_${name}`)) {
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

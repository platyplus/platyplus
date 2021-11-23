import { useCallback } from 'react'

import { useAuthenticated, useUserIsAdmin } from '@platyplus/hbp'
import {
  CONFIG_TABLES,
  ContentsCollection,
  createSqlConfigInstruction,
  createSqlMigrations,
  isConsoleEnabled
} from '@platyplus/rxdb-hasura'

import { useStore } from '../store'
import { useDB } from '../database'

export const useConfigEnabled = () => {
  const auth = useAuthenticated()
  const admin = useUserIsAdmin()
  const consoleEnabled = isConsoleEnabled()
  return auth && (consoleEnabled || admin)
}

export const useCountConfigChanges = () =>
  useStore(
    (state) =>
      CONFIG_TABLES.reduce((acc, name) => {
        acc += Object.keys(state.forms[name]).length
        return acc
      }, 0) || false
  )

export const useResetConfig = () => useStore((state) => state.clearConfig)

export const usePersistConfig = () => {
  const forms = useStore((state) => state.forms)
  const clearConfig = useResetConfig()
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
        // TODO inform that createSqlMigrations failed
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

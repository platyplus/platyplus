import create from 'zustand'
import produce from 'immer'
import path from 'object-path'
import objectPath from 'object-path'
import deepMerge from 'deepmerge'
import {
  documentContents,
  Metadata,
  MetadataDocument,
  PropertyConfig
} from '@platyplus/rxdb-hasura'
import { isEmpty } from '@platyplus/data'
import {
  createSqlMigrations,
  propertyConfigToSql,
  tableConfigToSql
} from './migrations'

export const useConfigStore = create<{
  forms: Record<string, Record<string, Metadata>>
  getMetadata: (metadata: Metadata | undefined) => Metadata | undefined

  getTable: <T = Metadata['config']>(
    metadata: Metadata | MetadataDocument | undefined,
    path?: string
  ) => T | undefined
  setTable: <T = Metadata['config']>(
    metadata: Metadata | undefined,
    value: T,
    path?: string
  ) => void
  getProperty: <T = PropertyConfig>(
    metadata: Metadata | undefined,
    property: string,
    path?: string
  ) => T | undefined
  setProperty: <T = PropertyConfig>(
    metadata: Metadata | undefined,
    property: string,
    value: T,
    path?: string
  ) => void
  countChanges: () => number
  save: () => () => Promise<void>
}>((set, get) => ({
  forms: {},
  getMetadata: (metadata) =>
    metadata && objectPath.get(get().forms, metadata.id, metadata),

  getTable: <T = Metadata['config']>(
    metadata?: Metadata | MetadataDocument,
    subPath?: string
  ) => {
    if (!metadata) return undefined
    const p = ['config', ...(subPath ? [subPath] : [])]
    const formConfig: T = objectPath.get(get(), ['forms', metadata.id, ...p])
    const metadataConfig: T = objectPath.get(documentContents(metadata), p)
    if (subPath) return formConfig || metadataConfig
    return deepMerge<T>(metadataConfig || {}, formConfig || {})
  },
  setTable: (metadata, value, subPath) =>
    set(
      produce((state) => {
        path.set(
          state,
          ['forms', metadata.id, 'config', ...(subPath ? [subPath] : [])],
          value
        )
      })
    ),
  getProperty: <T = PropertyConfig>(
    metadata: Metadata | MetadataDocument | undefined,
    property: string,
    subPath?: string
  ) => {
    if (!metadata) return undefined
    const p = ['propertiesConfig', property, ...(subPath ? [subPath] : [])]
    const formConfig: T = objectPath.get(get(), ['forms', metadata.id, ...p])
    const metadataConfig: T = objectPath.get(documentContents(metadata), p)
    if (subPath) return formConfig || metadataConfig
    return deepMerge<T>(metadataConfig || {}, formConfig || {})
  },
  setProperty: (metadata, property, value, subPath) =>
    set(
      produce((state) => {
        path.set(
          state,
          [
            'forms',
            metadata.id,
            'propertiesConfig',
            property,
            ...(subPath ? [subPath] : [])
          ],
          value
        )
      })
    ),
  // TODO far from perfect. Ideally, it should test each value against existing metadata
  countChanges: () =>
    Object.values(get().forms).reduce((total, schema) => {
      total += Object.values(schema).reduce((acc, metadata) => {
        if (!isEmpty(metadata)) acc++
        return acc
      }, 0)
      return total
    }, 0),

  save: () => async () => {
    const operations: string[] = []
    for (const [schema, schemaValue] of Object.entries(get().forms)) {
      for (const [table, { config, propertiesConfig }] of Object.entries(
        schemaValue
      )) {
        const tableId = `${schema}.${table}`
        if (!isEmpty(config)) {
          operations.push(tableConfigToSql(tableId, config))
        }
        if (!isEmpty(propertiesConfig)) {
          for (const [property, config] of Object.entries(propertiesConfig)) {
            operations.push(propertyConfigToSql(tableId, property, config))
          }
        }
      }
    }
    await createSqlMigrations(operations)
    // TODO
    // ? patch rx metadata documents?
    // ? or wait for metadata rx documents to be synced with server?
    set({ forms: {} })
  }
}))

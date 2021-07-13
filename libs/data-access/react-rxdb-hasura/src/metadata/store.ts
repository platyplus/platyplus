import create from 'zustand'
import * as immutable from 'object-path-immutable'
import objectPath from 'object-path'

import { Metadata, PropertyConfig } from '@platyplus/rxdb-hasura'
import { upsertPropertyConfig } from './console'

export const useConfigStore = create<{
  forms: Record<string, Record<string, Metadata>>
  getMetadata: (metadata: Metadata | undefined) => Metadata | undefined

  getTable: <T = Metadata['config']>(
    metadata: Metadata | undefined,
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
  hasChanges: () => boolean
  save: () => () => Promise<void>
}>((set, get) => ({
  forms: {},
  getMetadata: (metadata) =>
    metadata && objectPath.get(get().forms, metadata.id, metadata),

  getTable: (metadata, subPath) => {
    let path = `config`
    if (subPath) path += `.${subPath}`
    return (
      metadata &&
      objectPath.get(
        get(),
        `forms.${metadata.id}.${path}`,
        objectPath.get(metadata, path)
      )
    )
  },
  setTable: (metadata, value, subPath) => {
    let path = `forms.${metadata.id}.config`
    if (subPath) path += `.${subPath}`
    set(immutable.set(get(), path, value))
  },

  getProperty: (metadata, property, subPath) => {
    let path = `propertiesConfig.${property}`
    if (subPath) path += `.${subPath}`
    return (
      metadata &&
      objectPath.get(
        get(),
        `forms.${metadata.id}.${path}`,
        objectPath.get(metadata, path)
      )
    )
  },
  setProperty: (metadata, property, value, subPath) => {
    let path = `forms.${metadata.id}.propertiesConfig.${property}`
    if (subPath) path += `.${subPath}`
    set(immutable.set(get(), path, value))
  },
  // TODO far from perfect. Ideally, it should test each value against existing metadata
  hasChanges: () =>
    Object.values(get().forms).some((schema) =>
      Object.values(schema).some((value) => !!value)
    ),

  save: () => async () => {
    for (const [schema, schemaValue] of Object.entries(get().forms)) {
      for (const [table, metadata] of Object.entries(schemaValue)) {
        if (metadata?.propertiesConfig) {
          for (const [property, config] of Object.entries(
            metadata.propertiesConfig
          )) {
            // TODO upsert all property configs and table config into one single migration
            await upsertPropertyConfig(`${schema}.${table}`, property, config)
          }
        }
      }
    }
    // ? patch rx metadata documents?
    // ? or wait for metadata rx documents to be synced with server?
    set({ forms: {} })
  }
}))

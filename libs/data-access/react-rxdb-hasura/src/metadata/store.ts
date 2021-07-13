import create from 'zustand'
import * as immutable from 'object-path-immutable'
import objectPath from 'object-path'

import { Metadata, PropertyConfig } from '@platyplus/rxdb-hasura'

export const useConfigStore = create<{
  forms: Record<string, Record<string, Metadata>>
  getMetadata: (metadata: Metadata | undefined) => Metadata | undefined

  getConfig: <T = Metadata['config']>(
    metadata: Metadata | undefined,
    path?: string
  ) => T | undefined
  setConfig: <T = Metadata['config']>(
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
}>((set, get) => ({
  forms: {},
  getMetadata: (metadata) =>
    metadata && objectPath.get(get().forms, metadata.id, metadata),

  getConfig: (metadata, subPath) => {
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
  setConfig: (metadata, value, subPath) => {
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
    Object.entries(get().forms).some(([schema, schemaValues]) =>
      Object.entries(schemaValues).some(([table, value]) => !!value)
    )
}))

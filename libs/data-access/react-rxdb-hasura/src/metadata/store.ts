import create from 'zustand'
import * as immutable from 'object-path-immutable'
import objectPath from 'object-path'

import { Metadata } from '@platyplus/rxdb-hasura'

export const useConfigStore = create<{
  forms: Record<string, Metadata>
  getPropertyTitle: (metadata: Metadata, property: string) => string
  setPropertyTitle: (
    metadata: Metadata,
    property: string,
    value: string
  ) => void
}>((set, get) => ({
  forms: {},
  // TODO getPropertyConfig and setPropertyConfig
  getPropertyTitle: (metadata, property) => {
    if (metadata) {
      const formTitle = objectPath.get(
        get().forms,
        `${metadata.id}.propertiesConfig.${property}.title`
      )
      const metadataTitle = objectPath.get(
        metadata,
        `propertiesConfig.${property}.title`
      )
      return formTitle || metadataTitle || property
    } else return property
  },
  setPropertyTitle: (metadata, property, title) =>
    set((state) => {
      return immutable.set(
        state,
        `forms.${metadata.id}.propertiesConfig.${property}.title`,
        title
      )
    })
}))

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
    const formTitle =
      metadata &&
      objectPath
        .get(get().forms, `${metadata.id}.propertiesConfig`)
        ?.find(({ property_name }) => property_name === property)?.title
    const metadataTitle = metadata?.propertiesConfig?.find(
      ({ property_name }) => property_name === property
    )?.title
    return formTitle || metadataTitle || property
  },
  setPropertyTitle: (metadata, property, title) =>
    set((state) => {
      const index = objectPath
        .get(get().forms, `${metadata.id}.propertiesConfig`, [])
        .findIndex(({ property_name }) => property_name === property)
      if (index < 0) {
        return immutable.push(state, `forms.${metadata.id}.propertiesConfig`, {
          component: null,
          description: null,
          icon: null,
          property_name: property,
          title
        })
      } else {
        return immutable.set(
          state,
          `forms.${metadata.id}.propertiesConfig.${index}.title`,
          title
        )
      }
    })
}))

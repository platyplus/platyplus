import create from 'zustand'

import { Metadata, metadataStore } from '@platyplus/rxdb-hasura'
import { useCallback } from 'react'

export const useMetadataStore = create(metadataStore)

export const useMetadata = (id: string): Metadata =>
  useMetadataStore(useCallback((store) => store.tables[id], [id]))

export const useIsMetadataReady = () =>
  useMetadataStore((store) => store.isReady())

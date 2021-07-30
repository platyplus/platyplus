import create from 'zustand'

import { metadataStore } from '@platyplus/rxdb-hasura'

export const useMetadataStore = create(metadataStore)

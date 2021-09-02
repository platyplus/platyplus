import produce from 'immer'
import { RxChangeEvent } from 'rxdb'

import { TableFragment } from '../../generated'
import { createReplicator } from '../../replicator'
import { MetadataStore, metadataStore, setCollectionIsReady } from '../../store'

import { METADATA_ROLE } from '../constants'
import { Metadata, MetadataCollection } from '../types'
import { subscription } from './graphql'

import { modifier } from './modifier'
import { queryBuilder } from './pull'
import { setMetadataTable } from './store-operations'

export type MetadataReplicatorOptions = {
  url: string
  batchSize?: number
  token?: string
}

export const createMetadataReplicator = async (
  collection: MetadataCollection
) => {
  // * Loads initial data from RxDB if some documents have been persisted (offline mode)
  const initialDocuments = await collection.find().exec()
  if (initialDocuments.length) {
    for (const doc of initialDocuments) setMetadataTable(doc)
    setCollectionIsReady(collection.name)
  }

  createReplicator(collection, {
    url: collection.database.options.url,
    role: METADATA_ROLE,
    pull: {
      queryBuilder: queryBuilder(collection.database),
      modifier: modifier(collection)
    },
    subscription: { query: subscription },
    onStart: () => {
      const subscription = collection.$.subscribe(
        ({
          operation,
          documentData,
          previousDocumentData
        }: RxChangeEvent<TableFragment>) => {
          if (documentData.id) {
            if (operation === 'INSERT' || operation === 'UPDATE') {
              setMetadataTable(documentData as TableFragment)
            }
          }
        }
      )
      return () => subscription.unsubscribe()
    },
    // * When receiving changes in the websocket, check if some of the tables have been removed.
    // * If so, remove them from the store
    // * A store subscription will then trigger the removal of the corresponding RxDB collections
    onWsReceive: (data: Metadata[]) => {
      metadataStore.setState(
        produce<MetadataStore>((state) => {
          Object.keys(metadataStore.getState().tables).forEach((id) => {
            if (!data.find((table) => table.id === id)) delete state.tables[id]
          })
        })
      )
    }
  })
}

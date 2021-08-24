import { RxChangeEvent } from 'rxdb'

import { TableFragment } from '../../generated'
import { createReplicator } from '../../replicator'

import { METADATA_ROLE } from '../constants'
import { MetadataCollection } from '../types'
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
) =>
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
          if (operation === 'INSERT') {
            if (documentData.id) {
              setMetadataTable(documentData)
            }
          } else if (operation === 'UPDATE') {
            // console.log(
            //   `[${collection.name}] TODO - Updated metadata`,
            //   previousDocumentData,
            //   documentData
            // )
            // TODO update collection -> run a migration when needed (only when columns change?)
          }
        }
      )
      return () => subscription.unsubscribe()
    }
  })

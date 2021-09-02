import { RxChangeEvent } from 'rxdb'

import { createReplicator } from '../../replicator'
import { setCollectionIsReady } from '../../store'
import { Contents } from '../../types'

import { METADATA_ROLE } from '../constants'
import { ConfigCollection } from '../types'

import { generateCollectionSettings } from './settings-generator'

export const createConfigReplicator = async (collection: ConfigCollection) => {
  const config = collection.options.config
  const settings = generateCollectionSettings(collection.name, config)

  // * Loads initial data from RxDB if some documents have been persisted (offline mode)
  const initialDocuments = await collection.find().exec()
  if (initialDocuments.length) {
    for (const doc of initialDocuments) config.onUpsert?.(doc.toJSON())
    setCollectionIsReady(collection.name)
  }

  return await createReplicator(collection, {
    role: METADATA_ROLE,
    url: collection.database.options.url,
    pull: {
      queryBuilder: settings.pullQueryBuilder
    },
    push: {
      queryBuilder: settings.pushQueryBuilder,
      modifier: settings.pushModifier
    },
    subscription: {
      query: settings.subscription,
      variables: () => ({
        now: new Date().toUTCString()
      })
    },
    onStart: () => {
      const subscription = collection.$.subscribe(
        async ({
          operation,
          documentData,
          previousDocumentData,
          documentId
        }: RxChangeEvent<Contents>) => {
          if (documentData.id) {
            if (operation === 'INSERT' || operation === 'UPDATE') {
              if (documentData.id) config.onUpsert?.(documentData)
            } else if (operation === 'DELETE') {
              config.onDelete?.(previousDocumentData)
            }
          }
        }
      )
      return () => subscription.unsubscribe()
    }
  })
}

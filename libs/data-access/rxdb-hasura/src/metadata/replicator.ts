import { RxChangeEvent } from 'rxdb'

import { debug } from '@platyplus/logger'

import { createReplicator } from '../utils/replicator'
import { setReplicationReady } from '../state'
import { Contents } from '../types'

import { METADATA_ROLE } from '../constants'
import {
  CollectionSettings,
  ConfigCollection,
  TableInfoCollection
} from './types'
import { generateReplicationSettings } from './utils'

export const createSettingsReplicator = async (
  collection: ConfigCollection | TableInfoCollection
) => {
  const collectionSettings: CollectionSettings = collection.options.config
  const settings = generateReplicationSettings(
    collection.name,
    collectionSettings
  )

  // * Loads initial data from RxDB if some documents have been persisted (offline mode)
  const initialDocuments = await collection.find().exec()
  if (initialDocuments.length) {
    for (const doc of initialDocuments)
      collectionSettings.onUpsert?.(doc.toJSON())
  } else {
    debug(`[${collection.name}] no initial documents`)
  }
  setReplicationReady(collection.name)

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
              if (documentData.id) collectionSettings.onUpsert?.(documentData)
            } else if (operation === 'DELETE') {
              collectionSettings.onDelete?.(previousDocumentData)
            }
          }
        }
      )
      return () => subscription.unsubscribe()
    },
    onWsReceive: collectionSettings.onWsReceive
  })
}

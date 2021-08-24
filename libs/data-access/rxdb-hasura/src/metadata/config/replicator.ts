import { RxChangeEvent, RxCollection } from 'rxdb'
import { METADATA_ROLE } from '../constants'
import { Contents } from '../../types'

import { generateCollectionSettings } from './settings-generator'
import { createReplicator } from '../../replicator'

export const createConfigReplicator = async (collection: RxCollection) => {
  const config = collection.options.config
  const settings = generateCollectionSettings(collection.name, config)

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

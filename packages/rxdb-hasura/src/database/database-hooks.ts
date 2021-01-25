import { info } from '../console'
import { createMetadataReplicator, metadataSchema } from '../metadata'
import { Database } from '../types'
import { hasuraCollections } from './helpers'
import { contents } from './observables'

export const createRxDatabase = async (db: Database): Promise<void> => {
  info(`Add metadata to RxDatabase ${db.name}`)
  await db.addCollections({
    user_metadata: {
      schema: metadataSchema,
      autoMigrate: true
    },
    me_metadata: {
      schema: metadataSchema,
      autoMigrate: true
    }
  })
  await createMetadataReplicator(db.user_metadata, 'user')
  await createMetadataReplicator(db.me_metadata, 'me')
  contents.next(hasuraCollections(db))
}

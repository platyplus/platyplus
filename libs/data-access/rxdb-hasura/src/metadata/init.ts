import { contentsCollections } from '../database'
import { Database } from '../types'
import { initConfigCollections } from './config'
import { metadataSchema } from './table'

export const initMetadataCollections = async (db: Database) => {
  await db.addCollections({
    metadata: {
      options: { isMetadataCollection: true },
      schema: metadataSchema,
      autoMigrate: true
    }
  })
  db.contents$.next(contentsCollections(db))
  await initConfigCollections(db)
}

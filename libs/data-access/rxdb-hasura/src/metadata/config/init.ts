import { Database } from '../../types'
import { configCollectionDefinitions } from './definitions'
import { createReplicatedCollection } from './generator'

export const initConfigCollections = async (db: Database) => {
  for (const [name, config] of Object.entries(configCollectionDefinitions)) {
    await createReplicatedCollection(db, name, config)
  }
}

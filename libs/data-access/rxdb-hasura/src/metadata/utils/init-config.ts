import { Database } from '../../types'
import { createCollection } from '../../utils'

import { CONFIG_COLLECTIONS_DEFINITIONS } from '../constants'

export const initConfigCollections = async (db: Database) => {
  for (const [name, config] of Object.entries(CONFIG_COLLECTIONS_DEFINITIONS)) {
    if (!db.collections[name]?.replicator.state) {
      await createCollection(db, name, {
        schema: config.schema,
        autoMigrate: true,
        options: {
          isConfig: true,
          config
        }
      })
    }
  }
}

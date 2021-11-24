import { debug } from '@platyplus/logger'
import { Database } from '../../types'
import { createCollection } from '../../utils'

import { CONFIG_COLLECTIONS_DEFINITIONS } from '../constants'
export const initConfigCollections = async (db: Database) => {
  debug('db', 'Init config collections')
  for (const [name, config] of Object.entries(CONFIG_COLLECTIONS_DEFINITIONS)) {
    if (!db.collections[name]?.replicator?.state && !db.collections[name]) {
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

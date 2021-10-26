import {
  APP_CONFIG_TABLE,
  PROPERTY_CONFIG_TABLE,
  TABLE_CONFIG_TABLE
} from '../constants'
import { Database } from '../types'
import { createCollection } from '../utils'

import { CollectionSettings } from './types'
import { appConfig } from './app-config'
import { propertyConfig } from './property-config'
import { tableConfig } from './table-config'

const configCollectionDefinitions: Record<string, CollectionSettings> = {
  [APP_CONFIG_TABLE]: appConfig,
  [TABLE_CONFIG_TABLE]: tableConfig,
  [PROPERTY_CONFIG_TABLE]: propertyConfig
}

export const initConfigCollections = async (db: Database) => {
  for (const [name, config] of Object.entries(configCollectionDefinitions)) {
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

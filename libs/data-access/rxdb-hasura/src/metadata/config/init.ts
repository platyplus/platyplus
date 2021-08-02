import { Database } from '../../types'
import { appConfig } from './app'
import { createReplicatedCollection } from './generator'
import { propertyConfig } from './property'
import { tableConfig } from './table'
import { CollectionConfig, ConfigCollectionName } from './types'

export const configCollectionDefinitions: Record<string, CollectionConfig> = {
  app_config: appConfig,
  table_config: tableConfig,
  property_config: propertyConfig
}

export const initConfigCollections = async (db: Database) => {
  for (const [name, config] of Object.entries(configCollectionDefinitions)) {
    await createReplicatedCollection(db, name as ConfigCollectionName, config)
  }
}

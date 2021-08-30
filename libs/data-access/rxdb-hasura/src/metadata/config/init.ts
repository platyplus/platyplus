import { RxDatabase } from 'rxdb'
import { metadataStore } from '../../store'
import { appConfig } from './app'
import { propertyConfig } from './property'
import { tableConfig } from './table'
import { CollectionConfig } from './types'

export const configCollectionDefinitions: Record<string, CollectionConfig> = {
  app_config: appConfig,
  table_config: tableConfig,
  property_config: propertyConfig
}

export const initConfigCollections = async (db: RxDatabase) => {
  for (const [name, config] of Object.entries(configCollectionDefinitions)) {
    if (!metadataStore.getState().replication[name].ready)
      await db.addCollections({
        [name]: {
          schema: config.schema,
          autoMigrate: true,
          options: {
            isConfig: true,
            config
          }
        }
      })
  }
}

import { RxDatabase } from 'rxdb'
import { tableInfoStore, setCollectionIsReady } from '../store'
import { CollectionSettings } from './types'
import { appConfig } from './app-config'
import { propertyConfig } from './property-config'
import { tableConfig } from './table-config'

const configCollectionDefinitions: Record<string, CollectionSettings> = {
  app_config: appConfig,
  table_config: tableConfig,
  property_config: propertyConfig
}

export const initConfigCollections = async (db: RxDatabase) => {
  for (const [name, config] of Object.entries(configCollectionDefinitions)) {
    if (!tableInfoStore.getState().replication[name].ready) {
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
      setCollectionIsReady(name)
    }
  }
}

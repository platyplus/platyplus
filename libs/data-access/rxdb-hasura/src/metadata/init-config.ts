import { RxDatabase } from 'rxdb'
import { tableInfoStore, setCollectionIsReady } from '../store'
import { CollectionSettings } from './types'
import { appConfig } from './app-config'
import { propertyConfig } from './property-config'
import { tableConfig } from './table-config'
import {
  APP_CONFIG_TABLE,
  PROPERTY_CONFIG_TABLE,
  TABLE_CONFIG_TABLE
} from './utils'

const configCollectionDefinitions: Record<string, CollectionSettings> = {
  [APP_CONFIG_TABLE]: appConfig,
  [TABLE_CONFIG_TABLE]: tableConfig,
  [PROPERTY_CONFIG_TABLE]: propertyConfig
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

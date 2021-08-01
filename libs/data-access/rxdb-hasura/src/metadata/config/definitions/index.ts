import { CollectionConfig } from '../types'
import { appConfig } from './app'
import { propertyConfig } from './property'
import { tableConfig } from './table'

export const configCollectionDefinitions: Record<string, CollectionConfig> = {
  app_config: appConfig,
  table_config: tableConfig,
  property_config: propertyConfig
}

export type { PropertyConfig } from './property'

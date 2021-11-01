import { PROPERTY_CONFIG_TABLE } from './constants'
import { CollectionSettings } from '../utils/types'
import { query, mutation, subscription } from './graphql'
import { schema } from './schema'
import type { PropertyConfig } from './types'

export * from './constants'
export * from './types'

export const propertyConfig: CollectionSettings<PropertyConfig> = {
  collectionName: PROPERTY_CONFIG_TABLE,
  query,
  mutation,
  subscription,
  schema
}

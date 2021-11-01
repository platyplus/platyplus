import { APP_CONFIG_TABLE } from './constants'
import { CollectionSettings } from '../utils/types'

import { query, mutation, subscription } from './graphql'
import { schema } from './schema'
import type { AppConfig } from './types'
export * from './constants'
export * from './types'

export const appConfig: CollectionSettings<AppConfig> = {
  collectionName: APP_CONFIG_TABLE,
  query,
  mutation,
  subscription,
  schema
}

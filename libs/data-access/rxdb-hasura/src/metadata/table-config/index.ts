import { TABLE_CONFIG_TABLE } from './constants'
import { CollectionSettings } from '../utils/types'

import { query, mutation, subscription } from './graphql'
import { schema } from './schema'
import type { TableConfig } from './types'
export * from './constants'
export * from './types'

export const tableConfig: CollectionSettings<TableConfig> = {
  collectionName: TABLE_CONFIG_TABLE,
  query,
  mutation,
  subscription,
  schema
}

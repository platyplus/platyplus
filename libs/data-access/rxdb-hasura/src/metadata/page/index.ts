import { PAGES_TABLE } from './constants'
import { CollectionSettings } from '../utils/types'

import { query, mutation, subscription } from './graphql'
import { schema } from './schema'
import type { Page } from './types'
export * from './constants'
export * from './types'

export const pages: CollectionSettings<Page> = {
  collectionName: PAGES_TABLE,
  query,
  mutation,
  subscription,
  schema
}

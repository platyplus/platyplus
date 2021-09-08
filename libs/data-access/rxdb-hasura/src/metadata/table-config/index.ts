import { CollectionSettings } from '../types'

import { query, mutation, subscription } from './graphql'
import { schema } from './schema'

export const tableConfig: CollectionSettings = {
  query,
  mutation,
  subscription,
  schema
}

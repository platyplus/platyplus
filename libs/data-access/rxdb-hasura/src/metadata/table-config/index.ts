import { CollectionSettings } from '../types'

import { query, mutation, subscription } from './graphql'
import { schema } from './schema'
import { onUpsert, onDelete } from './store-operations'

export const tableConfig: CollectionSettings = {
  query,
  mutation,
  subscription,
  schema,
  onUpsert,
  onDelete
}

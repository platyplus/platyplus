import { CollectionConfig } from '../types'
import { query, mutation, subscription } from './graphql'
import { schema } from './schema'
import { onUpsert, onDelete } from './store-operations'

export const propertyConfig: CollectionConfig = {
  query,
  mutation,
  subscription,
  schema,
  onUpsert,
  onDelete
}

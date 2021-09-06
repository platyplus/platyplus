import { CollectionSettings } from '../types'
import { query, subscription } from './graphql'
import { schema } from './schema'
import { onUpsert, onDelete, onWsReceive } from './store-operations'
export * from './schema'

export const tableInformationSettings: CollectionSettings = {
  query,
  subscription,
  schema,
  onUpsert,
  onDelete,
  onWsReceive
}

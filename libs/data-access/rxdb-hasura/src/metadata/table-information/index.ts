import { CollectionSettings } from '../types'
import { query, subscription } from './graphql'
import { schema } from './schema'
import { onUpsert, onDelete } from './store-operations'

export * from './schema'
export {
  getTableInfo,
  getCollectionTableInfo,
  getDocumentTableInfo
} from './store'

export const tableInformationSettings: CollectionSettings = {
  query,
  subscription,
  schema,
  onUpsert,
  onDelete
}

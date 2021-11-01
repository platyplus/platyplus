import { CollectionSettings } from '../utils/types'
import { query, subscription } from './graphql'
import { schema } from './schema'
import { onUpsert, onDelete } from './store-operations'
import type { TableInfo } from './types'
export * from './schema'
export * from './init'
export * from './constants'
export * from './types'

export {
  getTableInfo,
  getCollectionTableInfo,
  getDocumentTableInfo
} from './store'

export const tableInformationSettings: CollectionSettings<TableInfo> = {
  collectionName: `platyplus_tables`,
  query,
  subscription,
  schema,
  onUpsert,
  onDelete
}

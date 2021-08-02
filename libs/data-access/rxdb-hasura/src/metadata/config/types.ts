/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentNode } from 'graphql'
import { RxJsonSchema } from 'rxdb'
export * from './table/types'
export * from './property/types'

export type CollectionConfig = {
  query: DocumentNode
  mutation: DocumentNode
  subscription: DocumentNode
  schema: RxJsonSchema<any>
  onUpsert?: (doc: any) => void
  onDelete?: (doc: any) => void
}

export type ConfigCollectionName =
  | 'app_config'
  | 'property_config'
  | 'table_config'

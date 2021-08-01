/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentNode } from 'graphql'
import { RxJsonSchema } from 'rxdb'

export type PropertyConfig = {
  id: string
  property_id: string
  updated_at: string
  table_id: string
  property_name: string
  component?: string
  json_schema?: Record<string, unknown>
  icon?: string
  description?: string
  title?: string
}

export type CollectionConfig = {
  query: DocumentNode
  mutation: DocumentNode
  subscription: DocumentNode
  schema: RxJsonSchema<any>
  onUpsert?: (doc: any) => void
  onDelete?: (doc: any) => void
}

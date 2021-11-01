import { ReplicatedCollection } from '../utils/replication/types'

export type PropertyConfig = {
  id: string
  updated_at: string
  table_id: string
  property_name: string
  component?: string
  json_schema?: Record<string, unknown>
  icon?: string
  description?: string
  title?: string
}

export type PropertyConfigCollection = ReplicatedCollection<PropertyConfig>

import { ReplicatedCollection } from '../utils/replication/types'

export type TableConfig = {
  id: string
  updated_at: string
  component?: string
  description?: string
  document_label?: string
  document_title?: string
  document_component?: string
  title?: string
  icon?: string
  order?: string[]
}

export type TableConfigCollection = ReplicatedCollection<TableConfig>

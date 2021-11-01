import { ReplicatedCollection } from '../utils/replication/types'

export type MenuItem = {
  type: 'table' | 'page'
  id: string
  name: string
  icon?: string
}
export type AppConfig = {
  id: string
  updated_at: string
  menu: Array<MenuItem>
  home: string
}

export type AppConfigCollection = ReplicatedCollection<AppConfig>

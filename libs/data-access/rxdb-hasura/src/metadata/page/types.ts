import { ReplicatedCollection } from '../utils/replication/types'

export type Page = {
  id: string
  updated_at: string
  title?: string
  slug: string
  contents: string
  icon?: string
}

export type PagesCollection = ReplicatedCollection<Page>

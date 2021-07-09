import { CollectionComponentsConfig } from '../types'

import { LabelCollection } from './label'
import { ListCollection } from './list'
import { TableCollection } from './table'
import { TagCollection } from './tag'

export const defaultCollectionComponents: CollectionComponentsConfig = {
  default: TableCollection,
  label: LabelCollection,
  table: TableCollection,
  list: ListCollection,
  tag: TagCollection
}

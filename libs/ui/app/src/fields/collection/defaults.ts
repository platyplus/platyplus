import { CollectionSelectField } from './select'
import { CollectionTagField } from './tag'

export const defaultFieldCollectionComponents = {
  default: CollectionTagField,
  tag: CollectionTagField,
  select: CollectionSelectField
}

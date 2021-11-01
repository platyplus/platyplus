import { RxJsonSchema } from 'rxdb'
import { DocumentNode } from 'graphql'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CollectionSettings<T = any> = {
  collectionName: string
  query: DocumentNode
  mutation?: DocumentNode
  subscription: DocumentNode
  schema: RxJsonSchema<T>
  onUpsert?: (doc: T) => void
  onDelete?: (doc: T) => void
  onWsReceive?: (doc: T[]) => void
}

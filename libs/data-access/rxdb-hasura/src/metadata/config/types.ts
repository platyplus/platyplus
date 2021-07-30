import { DocumentNode } from 'graphql'
import { RxJsonSchema } from 'rxdb'
import { DeepReadonly } from 'rxdb/dist/types/types'
import { Contents } from '../../types'

export type CollectionConfig = {
  query: DocumentNode
  mutation: DocumentNode
  subscription: DocumentNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: RxJsonSchema<any>
  onUpsert?: (doc: Contents | DeepReadonly<Contents>) => void
  onDelete?: (doc: Contents | DeepReadonly<Contents>) => void
}

import { DocumentNode } from 'graphql'
import clone from 'clone-deep'

export const queryToSubscription = (query: DocumentNode): DocumentNode => {
  const result: typeof query = clone(query)
  result.definitions.forEach((definition) => {
    if (definition.kind === 'OperationDefinition') {
      ;(definition.operation as string) = 'subscription'
    }
  })
  return result
}

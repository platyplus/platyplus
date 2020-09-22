// ! Requires graphql-request@2.1.0-next.1
// ! See https://github.com/prisma-labs/graphql-request/issues/168
import { DocumentNode, print } from 'graphql'
import { GraphQLClient } from 'graphql-request'
import { Variables } from 'graphql-request/dist/types'

const DEFAULT_HASURA_ENDPOINT =
  process.env.HASURA_ENDPOINT || 'http://graphql-engine:8080/v1/graphql'
const DEFAULT_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET
/**
 * * Simple graphql-request wrapper. Pre-configured Hasura parameters (endpoint and admin-secret)
 */
export class Client extends GraphQLClient {
  constructor(
    endpoint = DEFAULT_HASURA_ENDPOINT,
    secret = DEFAULT_ADMIN_SECRET
  ) {
    super(
      endpoint,
      secret
        ? {
            headers: {
              'x-hasura-admin-secret': secret
            }
          }
        : undefined
    )
  }

  /**
   * @param query GraphQL request, either as string or GraphQL document (e.g. tagged gql`...` request)
   * @param variables
   */
  request<T = unknown, V = Variables>(
    query: DocumentNode | string,
    variables?: V
  ): Promise<T> {
    const strQuery = typeof query === 'string' ? query : print(query)
    return super.request<T, V>(strQuery, variables)
  }
}

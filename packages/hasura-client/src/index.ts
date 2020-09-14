// ! Requires graphql-request@2.1.0-next.1
// ! See https://github.com/prisma-labs/graphql-request/issues/168
import { DocumentNode, print } from 'graphql'
import { GraphQLClient } from 'graphql-request'
import { Variables } from 'graphql-request/dist/types'

class Client extends GraphQLClient {
  constructor(
    endpoint = process.env.HASURA_ENDPOINT ||
      'http://graphql-engine:8080/v1/graphql',
    secret = process.env.HASURA_GRAPHQL_ADMIN_SECRET
  ) {
    super(
      endpoint,
      secret
        ? {
            headers: {
              'x-hasura-admin-secret': secret,
            },
          }
        : undefined
    )
  }
  request<T = unknown, V = Variables>(
    query: DocumentNode | string,
    variables?: V
  ) {
    const strQuery = typeof query === 'string' ? query : print(query)
    return super.request<T, V>(strQuery, variables)
  }
}

export const hasuraClient = new Client()

// ! Requires graphql-request@2.1.0-next.1
// ! See https://github.com/prisma-labs/graphql-request/issues/168
import { DocumentNode, print } from 'graphql'
import { GraphQLClient } from 'graphql-request'

const HASURA_GRAPHQL_ADMIN_SECRET = process.env
  .HASURA_GRAPHQL_ADMIN_SECRET as string

const HASURA_ENDPOINT =
  process.env.HASURA_ENDPOINT || 'http://graphql-engine:8080/v1/graphql'

class Client extends GraphQLClient {
  constructor() {
    super(HASURA_ENDPOINT, {
      headers: {
        'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET
      }
    })
  }
  request<T = unknown>(
    query: DocumentNode | string,
    variables?: { [key: string]: unknown } | undefined
  ) {
    const strQuery = typeof query === 'string' ? query : print(query)
    return super.request<T>(strQuery, variables)
  }
}

export const hasuraClient = new Client()

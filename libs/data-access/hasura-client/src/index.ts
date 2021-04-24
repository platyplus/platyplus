import { GraphQLClient } from 'graphql-request'

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
}

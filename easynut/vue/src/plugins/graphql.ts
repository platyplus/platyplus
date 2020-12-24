import { Instance } from '@platyplus/vue-hasura-backend-plus'
import { GraphQLClient } from 'graphql-request'
import { App, inject, InjectionKey } from 'vue'

export const DefaultKey = Symbol()

export type GraphQLPluginOptions = {
  endpoint: string
  adminSecret?: string
  hbp?: Instance
}

export class GraphQLPlugin {
  client: GraphQLClient
  hbp?: Instance
  constructor(options: GraphQLPluginOptions) {
    this.client = new GraphQLClient(options.endpoint)
    if (options.adminSecret) {
      this.client.setHeader('x-hasura-admin-secret', options.adminSecret)
    }

    this.hbp = options.hbp
  }
  install(app: App, injectKey: string | InjectionKey<unknown>): void {
    this.hbp?.auth.onAuthStateChanged((status: boolean) => {
      if (status) {
        this.hbp &&
          this.client.setHeader(
            'authorization',
            `Bearer ${this.hbp.auth.getJWTToken()}`
          )
      } else {
        this.client.setHeader('authorization', '')
      }
    })
    app.provide(injectKey || DefaultKey, this.client)
  }
}

export const createGraphQLPlugin = (
  options: GraphQLPluginOptions
): GraphQLPlugin => {
  return new GraphQLPlugin(options)
}

export const useGraphQLClient = (): GraphQLClient => {
  const client = inject<GraphQLClient>(DefaultKey)
  if (client) {
    return client
  } else throw Error('GraphQL client not set')
}

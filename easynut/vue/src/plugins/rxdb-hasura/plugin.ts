import { Instance } from '@platyplus/vue-hasura-backend-plus'
import { GraphQLClient } from 'graphql-request'
import { App, InjectionKey } from 'vue'

import { getSdk } from '../../generated'
import { createDb, RxHasuraDatabase } from './database'
import { GraphQLReplicator } from './replicator'
export const DefaultKey = Symbol()

export type RxDBHasuraPluginOptions = {
  name: string
  endpoint: string
  hbp: Instance
  adminSecret?: string
}
// TODO explicit 'logout' that destroys the database. Don't destroy when auth status changes (it means we're offline)
export class RxDBHasuraPlugin {
  client: GraphQLClient
  hbp: Instance
  db?: RxHasuraDatabase
  name: string
  replicator?: GraphQLReplicator
  endpoint: string

  constructor({ name, endpoint, adminSecret, hbp }: RxDBHasuraPluginOptions) {
    this.client = new GraphQLClient(endpoint)
    if (adminSecret) {
      this.client.setHeader('x-hasura-admin-secret', adminSecret)
    }
    this.hbp = hbp
    this.name = name
    this.endpoint = endpoint
  }

  private updateToken(): string {
    const token = this.hbp.auth.getJWTToken()
    this.replicator?.setToken(token)
    if (token) {
      this.client.setHeader('authorization', `Bearer ${token}`)
    } else {
      this.client.setHeader('authorization', '') // TODO ugly
    }

    return token
  }

  install(app: App, injectKey: string | InjectionKey<unknown>): void {
    this.hbp.auth.onAuthStateChanged(async (status: boolean) => {
      console.log('State changed', status)
      const token = this.updateToken()
      if (status) {
        if (!this.db) {
          this.db = await createDb({
            name: this.name,
            // password: 'myPassword', // <- password (optional)
            multiInstance: true, // <- multiInstance (optional, default: true)
            eventReduce: false // <- eventReduce (optional, default: true))
          })
          const tables = (await getSdk(this.client).metadata()).metadata_table
          await this.db.addTables(tables)
          await this.replicator?.stop()
          this.replicator = new GraphQLReplicator(
            this.db,
            tables,
            this.endpoint,
            token
          )
          await this.replicator.start()
        }
      } else {
        await this.replicator?.stop()
      }
    })

    this.hbp.auth.onTokenChanged(() => {
      console.log('Token changed')
      this.updateToken()
    })

    app.provide(injectKey || DefaultKey, this.db)
  }
}

export const createRxDBHasuraPlugin = (
  options: RxDBHasuraPluginOptions
): RxDBHasuraPlugin => {
  return new RxDBHasuraPlugin(options)
}

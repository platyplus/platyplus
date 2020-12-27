import { RxDatabase } from 'rxdb'
import { RxGraphQLReplicationState } from 'rxdb/plugins/replication-graphql'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { TableFragment } from '../../generated'
import { httpUrlToWebSockeUrl } from '../../utils/helpers'
import {
  pullQueryBuilder,
  pushQueryBuilder,
  subscriptionQuery
} from './graphql-builders'
import { pullModifier } from './graphql-builders/pull'
import { pushModifier } from './graphql-builders/push'
import { fullTableName } from './helpers'

export class GraphQLReplicator {
  httpUrl: string
  db: RxDatabase
  states: Record<string, RxGraphQLReplicationState> = {}
  subscriptions: Record<string, SubscriptionClient> = {}
  token?: string
  tables: Record<string, TableFragment> = {}
  batchSize = 5

  constructor(
    db: RxDatabase,
    tables: TableFragment[],
    httpUrl: string,
    token?: string
  ) {
    console.log('Replicator: creating')
    this.db = db
    this.httpUrl = httpUrl
    this.setToken(token)
    for (const table of tables) {
      this.tables[fullTableName(table)] = table
    }
    console.log('Replicator: created')
  }

  setToken(token?: string): void {
    console.log('Replicator: setToken')
    this.token = token
    const authorization = token && `Bearer ${token}`
    for (const state of Object.values(this.states)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { Authorization, ...headers } = state.headers
      if (authorization) headers['Authorization'] = authorization
      state.setHeaders(headers)
    }
  }

  private async stopOne(collectionName: string): Promise<void> {
    await this.states[collectionName]?.cancel()
    this.subscriptions[collectionName]?.close()
  }

  private async startOne(collectionName: string): Promise<void> {
    this.states[collectionName] = await this.setupOneGraphQLReplication(
      collectionName
    )
    this.subscriptions[collectionName] = this.setupGraphQLSubscription(
      collectionName
    )
    // await this.states[collectionName].awaitInitialReplication()
  }

  async start(): Promise<void> {
    console.log('Replicator: starting')
    for (const name of Object.keys(this.db.collections)) {
      await this.startOne(name)
    }
    console.log('Replicator: started')
  }

  async stop(): Promise<void> {
    console.log('Replicator: stopping')
    for (const name of Object.keys(this.db.collections)) {
      await this.stopOne(name)
    }
    console.log('Replicator: stopped')
  }

  async restart(): Promise<void> {
    await this.stop()
    await this.start()
  }

  private async setupOneGraphQLReplication(
    collectionName: string
  ): Promise<RxGraphQLReplicationState> {
    const collection = this.db.collections[collectionName]
    const table = this.tables[collectionName]
    const replicationState = collection?.syncGraphQL({
      url: this.httpUrl,
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      push: {
        batchSize: this.batchSize,
        queryBuilder: pushQueryBuilder(table),
        modifier: pushModifier(table)
      },
      pull: {
        queryBuilder: pullQueryBuilder(table, this.batchSize),
        modifier: pullModifier(table)
      },
      live: true,
      liveInterval: 1000 * 60 * 10, // 10 minutes
      deletedFlag: 'deleted'
    })
    replicationState.error$.subscribe(err => {
      console.error('replication error:', err)
    })

    return replicationState
  }

  private setupGraphQLSubscription(collectionName: string): SubscriptionClient {
    // TODO check if it reconnects when JWT changes
    const wsUrl = httpUrlToWebSockeUrl(this.httpUrl)
    const state = this.states[collectionName]
    const table = this.tables[collectionName]
    const wsClient = new SubscriptionClient(wsUrl, {
      reconnect: true,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      },
      timeout: 1000 * 60,
      //   onConnect: () => {
      //     console.log('SubscriptionClient.onConnect()')
      //   },
      connectionCallback: () => {
        console.log('SubscriptionClient.connectionCallback:')
      },
      reconnectionAttempts: 10000,
      inactivityTimeout: 10 * 1000,
      lazy: true
    })

    const ret = wsClient.request({
      query: subscriptionQuery(table)
    })

    ret.subscribe({
      next(data) {
        console.log('subscription emitted => trigger run', data)
        state.run()
      },
      error(error) {
        console.log('got error', error)
      }
    })

    return wsClient
  }
}

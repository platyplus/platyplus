import { RxDatabase } from 'rxdb'
import { RxGraphQLReplicationState } from 'rxdb/plugins/replication-graphql'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { TableFragment } from '../../generated'
import { httpUrlToWebSockeUrl } from '../../utils/helpers'
import {
  pullModifier,
  pullQueryBuilder,
  pushModifier,
  pushQueryBuilder,
  subscriptionQuery
} from './graphql-builders'
import { debug, error, fullTableName, info, warn } from './helpers'

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
    debug('Replicator: creating')
    this.db = db
    this.httpUrl = httpUrl
    for (const table of tables) {
      this.tables[fullTableName(table)] = table
    }
    this.setToken(token)
    debug('Replicator: created')
  }

  setToken(token?: string): void {
    debug('Replicator: setToken')
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
    debug('Replicator: starting')
    for (const name of Object.keys(this.db.collections)) {
      await this.startOne(name)
    }
    info('Replicator: started')
  }

  async stop(): Promise<void> {
    debug('Replicator: stopping')
    for (const name of Object.keys(this.db.collections)) {
      await this.stopOne(name)
    }
    debug('Replicator: stopped')
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
      deletedFlag: 'deleted',
      waitForLeadership: true // defaults to true
    })
    replicationState.error$.subscribe(err => {
      error('replication error:', err)
    })

    return replicationState
  }

  private setupGraphQLSubscription(collectionName: string): SubscriptionClient {
    // TODO check if it reconnects when JWT changes
    const wsUrl = httpUrlToWebSockeUrl(this.httpUrl)
    const collection = this.db.collections[collectionName]
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
      //     debug('SubscriptionClient.onConnect()')
      //   },
      // connectionCallback: () => {
      //   debug('SubscriptionClient.connectionCallback:')
      // },
      reconnectionAttempts: 10000,
      inactivityTimeout: 10 * 1000,
      lazy: true
    })

    const ret = wsClient.request({
      query: subscriptionQuery(collection, table)
    })

    ret.subscribe({
      next(data) {
        info(`subscription on ${collectionName} emitted`, data)
        state.run()
      },
      error(error) {
        warn(`subscription ${collectionName} error`, error)
      }
    })

    return wsClient
  }
}

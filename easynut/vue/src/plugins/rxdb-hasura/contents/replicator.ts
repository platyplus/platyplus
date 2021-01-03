import { RxCollection, RxDatabase } from 'rxdb'
import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { error, errorDir, info, warn } from '../console'
import { httpUrlToWebSockeUrl } from '../utils'
import { pullModifier, pullQueryBuilder } from './pull'
import { pushModifier, pushQueryBuilder } from './push'
import { subscriptionQuery } from './subscribe'

export const createContentReplicator = async (
  collection: RxCollection
): Promise<void> => {
  const url = collection.database.options.url
  const token = collection.database.options.token // TODO subscribe to token stored as an observable in the DB

  const DEFAULT_BATCH_SIZE = 5

  const setupGraphQLReplication = async (): Promise<RxGraphQLReplicationState> => {
    const replicationState = collection.syncGraphQL({
      url,
      headers: {
        Authorization: `Bearer ${token}`
      },
      push: {
        batchSize: DEFAULT_BATCH_SIZE,
        queryBuilder: pushQueryBuilder(collection),
        modifier: pushModifier(collection)
      },
      pull: {
        queryBuilder: pullQueryBuilder(collection, DEFAULT_BATCH_SIZE),
        modifier: pullModifier(collection)
      },
      live: true,
      liveInterval: 1000 * 60 * 10, // 10 minutes
      deletedFlag: 'deleted',
      waitForLeadership: true // defaults to true
    })
    replicationState.error$.subscribe(err => {
      error(`replication error on ${collection.name}`)
      errorDir(err.innerErrors)
    })
    return replicationState
  }

  const setupGraphQLSubscription = (): SubscriptionClient => {
    // TODO check if it reconnects when JWT changes
    const wsUrl = httpUrlToWebSockeUrl(url)
    const wsClient = new SubscriptionClient(wsUrl, {
      reconnect: true,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${token}`
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
      query: subscriptionQuery(collection)
    })

    ret.subscribe({
      next: data => {
        info(`subscription on ${collection.name} emitted`, data)
        state?.run()
      },
      error: error => {
        warn(`subscription ${collection.name} error`, error)
      }
    })

    return wsClient
  }

  const state = await setupGraphQLReplication()

  const db = collection.database as RxDatabase
  db.jwt$.subscribe((token: string) => {
    console.log(`Replicator (${collection.name}): set token`)
    // TODO change in websocket as well
    const authorization = token && `Bearer ${token}`
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { Authorization, ...headers } = state.headers
    if (authorization) headers['Authorization'] = authorization
    state.setHeaders(headers)
  })

  const subscription = setupGraphQLSubscription()

  const stop = async (): Promise<void> => {
    await state.cancel()
    subscription.close()
  }

  collection.replicator = { stop }
}
/*
export class GraphQLReplicator {
  httpUrl: string
  collection: RxCollection
  state?: RxGraphQLReplicationState
  subscription?: SubscriptionClient
  token?: string
  batchSize = 5

  constructor(collection: RxCollection, httpUrl: string, token?: string) {
    debug('Replicator: creating')
    this.collection = collection
    this.httpUrl = httpUrl
    this.setToken(token)
    debug('Replicator: created')
  }

  setToken(token?: string): void {
    debug('Replicator: setToken')
    this.token = token
    const authorization = token && `Bearer ${token}`
    if (this.state) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { Authorization, ...headers } = this.state.headers
      if (authorization) headers['Authorization'] = authorization
      this.state.setHeaders(headers)
    }
  }

  private async stop(): Promise<void> {
    await this.state?.cancel()
    this.subscription?.close()
  }

  private async start(): Promise<void> {
    this.state = await this.setupGraphQLReplication()
    this.subscription = this.setupGraphQLSubscription()
    // await this.states[collectionName].awaitInitialReplication()
  }

  async restart(): Promise<void> {
    await this.stop()
    await this.start()
  }

  private async setupGraphQLReplication(): Promise<RxGraphQLReplicationState> {
    const replicationState = this.collection.syncGraphQL({
      url: this.httpUrl,
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      push: {
        batchSize: this.batchSize,
        queryBuilder: pushQueryBuilder(this.collection),
        modifier: pushModifier(this.collection)
      },
      pull: {
        queryBuilder: pullQueryBuilder(this.collection, this.batchSize),
        modifier: pullModifier(this.collection)
      },
      live: true,
      liveInterval: 1000 * 60 * 10, // 10 minutes
      deletedFlag: 'deleted',
      waitForLeadership: true // defaults to true
    })
    replicationState.error$.subscribe(err => {
      error(`replication error on ${this.collection.name}`)
      errorDir(err.innerErrors)
    })

    return replicationState
  }

  private setupGraphQLSubscription(): SubscriptionClient {
    // TODO check if it reconnects when JWT changes
    const wsUrl = httpUrlToWebSockeUrl(this.httpUrl)
    // const collection = this.collection
    // const state = this.state
    // const table = this.collection.metadata
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
      query: subscriptionQuery(this.collection)
    })

    ret.subscribe({
      next: data => {
        info(`subscription on ${this.collection.name} emitted`, data)
        this.state?.run()
      },
      error: error => {
        warn(`subscription ${this.collection.name} error`, error)
      }
    })

    return wsClient
  }
}
*/

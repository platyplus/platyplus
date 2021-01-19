import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql'
import { Subscription } from 'rxjs'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { debug, error, errorDir, info, warn } from '../../console'
import { ContentsCollection } from '../../types'
import { httpUrlToWebSockeUrl } from '../../utils'
import { pullModifier, pullQueryBuilder } from './pull'
import { pushModifier, pushQueryBuilder } from './push'
import { subscriptionQuery } from './subscribe'

const DEFAULT_BATCH_SIZE = 5

export const createContentReplicator = async (
  collection: ContentsCollection
): Promise<void> => {
  const url = collection.database.options.url
  const db = collection.database

  let state: RxGraphQLReplicationState | undefined
  let wsSubscription: SubscriptionClient | undefined
  let jwtSubscription: Subscription | undefined

  const setupGraphQLReplication = async (): Promise<RxGraphQLReplicationState> => {
    const token = db.jwt$.getValue()
    const headers: Record<string, string> = token
      ? { Authorization: `Bearer ${token}` }
      : {}
    const replicationState = collection.syncGraphQL({
      url,
      headers,
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
      errorDir(err)
    })

    jwtSubscription = db.jwt$.subscribe((token: string | undefined) => {
      debug(`Replicator (${collection.name}): set token`)
      // TODO change in websocket as well
      const headers = replicationState.headers
      if (token) headers.Authorization = `Bearer ${token}`
      else delete headers.Authorization
      replicationState.setHeaders(headers)
      wsSubscription?.close()
      wsSubscription = setupGraphQLSubscription()
    })

    return replicationState
  }

  const setupGraphQLSubscription = (): SubscriptionClient => {
    // TODO problem when JWT is not valid anymore
    const wsUrl = httpUrlToWebSockeUrl(url)
    const token = db.jwt$.getValue()
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    const wsClient = new SubscriptionClient(wsUrl, {
      reconnect: true,
      connectionParams: {
        headers
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

  const start = async (): Promise<void> => {
    state = await setupGraphQLReplication()
    wsSubscription = setupGraphQLSubscription()
  }

  const stop = async (): Promise<void> => {
    await state?.cancel()
    jwtSubscription?.unsubscribe()
    wsSubscription?.close()
  }

  db.authStatus$.subscribe(async (status: boolean) => {
    if (status) await start()
    else await stop()
  })

  collection.replicator = { start, stop }
}

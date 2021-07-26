import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql'
import { Subscription } from 'rxjs'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { httpUrlToWebSockeUrl } from '@platyplus/data'

import { debug, error, errorDir, info, warn } from '../../console'
import { Contents, ContentsCollection } from '../../types'
import { createHeaders } from '../../utils'
import { pullModifier, pullQueryBuilder } from './pull'
import { pushModifier, pushQueryBuilder } from './push'
import { subscriptionQuery } from './subscribe'

const DEFAULT_BATCH_SIZE = 5

export const createContentReplicator = async (
  collection: ContentsCollection,
  role: string
): Promise<void> => {
  const db = collection.database
  const url = db.options.url

  let state: RxGraphQLReplicationState<Contents> | undefined
  let wsSubscription: SubscriptionClient | undefined
  let jwtSubscription: Subscription | undefined

  const setupGraphQLReplication = async (): Promise<
    RxGraphQLReplicationState<Contents>
  > => {
    const replicationState = collection.syncGraphQL({
      url,
      headers: createHeaders(role, db.jwt$.getValue()),
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
    replicationState.error$.subscribe((err) => {
      error(`replication error on ${collection.name}`)
      errorDir(err)
    })

    jwtSubscription = db.jwt$.subscribe((token?: string) => {
      debug(`Replicator (${collection.name}): set token`)
      replicationState.setHeaders(createHeaders(role, token, true))
      wsSubscription?.close()
      wsSubscription = setupGraphQLSubscription()
    })

    return replicationState
  }

  const setupGraphQLSubscription = (): SubscriptionClient => {
    const wsUrl = httpUrlToWebSockeUrl(url)
    const headers = createHeaders(role, db.jwt$.getValue(), true)
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
      next: (data) => {
        info(`subscription on ${collection.name} emitted`, data)
        state?.run()
      },
      error: (error) => {
        warn(`subscription ${collection.name} error`, error)
      }
    })

    return wsClient
  }

  const start = async (): Promise<void> => {
    state = await setupGraphQLReplication()
    // wsSubscription = setupGraphQLSubscription()
  }

  const stop = async (): Promise<void> => {
    await state?.cancel()
    jwtSubscription?.unsubscribe()
    wsSubscription?.close()
  }

  db.authStatus$.subscribe(async (status: boolean) => {
    debug('[contents] auth status change', status)
    if (status) await start()
    else await stop()
  })

  collection.replicator = { start, stop }
}

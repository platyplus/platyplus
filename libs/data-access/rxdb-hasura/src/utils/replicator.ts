import { RxCollection, RxGraphQLReplicationQueryBuilder } from 'rxdb'
import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql'
import { DocumentNode } from 'graphql'
import {
  setLastPullDocument,
  setLastPushSequence
} from 'rxdb/dist/lib/plugins/replication-graphql'
import { combineLatest, Subscription, map, distinctUntilChanged } from 'rxjs'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { httpUrlToWebSockeUrl } from '@platyplus/data'
import { debug, error, info, warn } from '@platyplus/logger'

import { Database, Replicator } from '../types'
import { DELETED_COLUMN } from '../contents'

import { createHeaders } from './hasura'

const DEFAULT_BATCH_SIZE = 5

export type ReplicatorOptions<RxDocType> = {
  url: string
  batchSize?: number
  pull: {
    queryBuilder: RxGraphQLReplicationQueryBuilder
    modifier?: (doc: RxDocType) => Promise<RxDocType> | RxDocType
  }
  push?: {
    queryBuilder?: RxGraphQLReplicationQueryBuilder
    modifier?: (doc: RxDocType) => Promise<RxDocType> | RxDocType
  }
  role: string
  substituteRole?: string
  onStart?: () => undefined | (() => void)
  onStop?: () => void
  onWsReceive?: (data) => void
  subscription: {
    query: string | DocumentNode
    variables?: () => Record<string, unknown>
  }
}

export const createReplicator = async <T>(
  collection: RxCollection<T, unknown> & { replicator: Replicator<T> },
  options: ReplicatorOptions<T>
): Promise<Replicator<T>> => {
  const db = collection.database as unknown as Database
  const headers = () =>
    createHeaders(options.role, db.jwt$.getValue(), options.substituteRole)
  const resetWs = () => {
    if (wsClient) {
      wsClient.unsubscribeAll()
      wsClient.close()
    }
  }
  let state: RxGraphQLReplicationState<T> | undefined
  let wsClient: SubscriptionClient | undefined
  let jwtSubscription: Subscription | undefined
  let errorSubscription: Subscription | undefined

  const setupGraphQLReplication = async () => {
    const replicationState = collection.syncGraphQL({
      url: options.url,
      headers: headers(),
      pull: {
        queryBuilder: options.pull.queryBuilder,
        modifier: options.pull.modifier
      },
      push: {
        batchSize: options.batchSize || DEFAULT_BATCH_SIZE,
        queryBuilder: options.push?.queryBuilder,
        modifier: options.push?.modifier
      },
      live: true,
      liveInterval: 1000 * 60 * 10, // 10 minutes
      deletedFlag: DELETED_COLUMN,
      waitForLeadership: true // defaults to true
    })
    replicationState.error$.subscribe((err) => {
      error(`[${collection.name}] replication error`, err)
      // TODO refresh JWT if error is related, but in any case refresh JWT before error occurs
    })

    // replicationState.initialReplicationComplete$.subscribe((active) =>
    //   active
    //     ? setReplicationReady(collection.name)
    //     : setReplicationBusy(collection.name)
    // )

    replicationState.canceled$.subscribe(() => {
      debug(`[${collection.name}] replication cancelled`)
      jwtSubscription?.unsubscribe()
      errorSubscription?.unsubscribe()
      startOption?.()
      resetWs()
    })
    return replicationState
  }

  const initWsSubscription = () => {
    debug(`[${collection.name}] initGraphQLSubscription`)
    wsClient = new SubscriptionClient(httpUrlToWebSockeUrl(options.url), {
      reconnect: true,
      connectionParams: {
        headers: headers()
      },
      timeout: 1000 * 60,
      reconnectionAttempts: 10000,
      inactivityTimeout: 10 * 1000,
      lazy: true
    })

    const request = wsClient.request({
      query: options.subscription.query,
      variables: options.subscription.variables?.()
    })

    request.subscribe({
      next: ({ data, ...rest }) => {
        if (data) {
          debug(
            `[${collection.name}] WS request emitted`,
            Object.values(data)[0]
          )
          options.onWsReceive?.(Object.values(data)[0])
          state?.run()
        } else {
          debug(`[${collection.name}] WS request emitted, but no data`, rest)
        }
      },
      error: (error) => {
        warn(`[${collection.name}] WS request error`, error)
      }
    })

    wsClient.onReconnected(() => {
      info(`[${collection.name}] WS reconnected`)
    })
    wsClient.onConnected(() => {
      debug(`[${collection.name}] WS connected`)
    })
    wsClient.onDisconnected(() => {
      debug(`[${collection.name}] WS disconnected`)
    })
    wsClient.onReconnecting(() => {
      info(`[${collection.name}] WS reconnecting`)
    })
    wsClient.onError((err) => {
      info(`[${collection.name}] WS error`, err)
    })
  }
  let startOption: undefined | (() => void)

  const start = async (): Promise<void> => {
    state = await setupGraphQLReplication()

    startOption = options.onStart?.()
    errorSubscription = state.error$.subscribe((data) => {
      warn('sync error', data)
    })

    db.jwt$.subscribe((jwt) => {
      debug(`[${collection.name}] set token`)
      if (jwt) {
        state.setHeaders(headers())
        initWsSubscription()
      } else debug(`[${collection.name}] set token BUT NO JWT`)
    })

    state.awaitInitialReplication().then(() => {
      debug(`[${collection.name}] awaitInitialReplication OK`)
    })
  }

  const stop = async (): Promise<void> => {
    debug(`[${collection.name}] stop replication`)
    await state?.cancel()
  }

  const destroy = async (): Promise<void> => {
    // ? open an issue on RxDB so this can be part of _prepare() in https://github.com/pubkey/rxdb/blob/master/src/plugins/replication-graphql/index.ts
    await setLastPullDocument(state.collection, state.endpointHash, null)
    await setLastPushSequence(state.collection, state.endpointHash, 0)
    await stop()
  }

  combineLatest([db.isConnected$, db.isAuthenticated$])
    .pipe(
      map(([connected, authenticated]) => connected && authenticated),
      distinctUntilChanged<boolean>()
    )
    .subscribe(async (ok) => {
      debug(`[${collection.name}] auth/connection status change`, ok)
      if (ok) await start()
      else await stop()
    })
  collection.replicator = { start, stop, destroy, state }
  return collection.replicator
}

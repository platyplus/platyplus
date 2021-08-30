/* eslint-disable @typescript-eslint/no-explicit-any */
import { RxCollection, RxGraphQLReplicationQueryBuilder } from 'rxdb'
import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql'
import { Subscription } from 'rxjs'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import produce from 'immer'

import { httpUrlToWebSockeUrl } from '@platyplus/data'
import { debug, error, info, warn } from './console'
import { createHeaders } from './utils'
import { MetadataStore, metadataStore, setCollectionIsReady } from './store'
import { DocumentNode } from 'graphql'
import { getJwt } from './auth-state'

const DEFAULT_BATCH_SIZE = 5

export type ReplicatorOptions = {
  url: string
  batchSize?: number
  pull: {
    queryBuilder: RxGraphQLReplicationQueryBuilder
    modifier?: (doc: any) => Promise<any> | any
  }
  push?: {
    queryBuilder?: RxGraphQLReplicationQueryBuilder
    modifier?: (doc: any) => Promise<any> | any
  }
  role: string
  substituteRole?: string
  onStart?: () => undefined | (() => void)
  onStop?: () => void
  subscription: {
    query: string | DocumentNode
    variables?: () => Record<string, unknown>
  }
}

export const createReplicator = async <RxDocType>(
  collection: RxCollection<RxDocType>,
  options: ReplicatorOptions
): Promise<{ start: any; stop: any }> => {
  const headers = () =>
    createHeaders(options.role, getJwt(), options.substituteRole)

  let state: RxGraphQLReplicationState<RxDocType> | undefined
  let wsClient: SubscriptionClient | undefined
  let jwtSubscription: () => void | undefined
  let errorSubscription: Subscription | undefined

  const setupGraphQLReplication = async (): Promise<
    RxGraphQLReplicationState<RxDocType>
  > => {
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
      deletedFlag: 'deleted',
      waitForLeadership: true // defaults to true
    })
    replicationState.error$.subscribe((err) => {
      error(`[${collection.name}] replication error`, err)
      // TODO refresh JWT if error is related, but in any case refresh JWT before error occurs
    })
    replicationState.active$.subscribe((active) => {
      if (active) {
        metadataStore.setState(
          produce<MetadataStore>((state) => {
            state.replication[collection.name] = {
              syncing: true,
              ready: state.replication[collection.name]?.ready || false
            }
          })
        )
      } else {
        metadataStore.setState(
          produce<MetadataStore>((state) => {
            state.replication[collection.name] = {
              syncing: false,
              ready: true
            }
          })
        )
      }
    })

    replicationState.setHeaders(headers())
    initGraphQLSubscription()
    return replicationState
  }

  const initGraphQLSubscription = () => {
    debug(`[${collection.name}] initGraphQLSubscription`)
    if (wsClient) {
      wsClient.unsubscribeAll()
      wsClient.close()
    }
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
      next: ({ data }) => {
        debug(`[${collection.name}] WS request emitted`, Object.values(data)[0])
        state?.run()
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
      warn(`[${collection.name}] WS error`, err)
    })
  }
  let startOption: undefined | (() => void)

  const start = async (): Promise<void> => {
    state = await setupGraphQLReplication()

    startOption = options.onStart?.()
    errorSubscription = state.error$.subscribe((data) => {
      warn('metadata sync error', data)
    })

    jwtSubscription = metadataStore.subscribe(
      (_: string | undefined) => {
        debug(`[${collection.name}] set token`)
        initGraphQLSubscription()
        state.setHeaders(headers())
      },
      (state) => state.jwt
    )

    state.awaitInitialReplication().then(() => {
      debug(`[${collection.name}] awaitInitialReplication OK`)
      setCollectionIsReady(collection.name)
    })
  }

  const stop = async (): Promise<void> => {
    info(`[${collection.name}] STOP`)
    await state?.cancel()
    jwtSubscription?.()
    errorSubscription?.unsubscribe()
    startOption?.()
  }

  const { connected, authenticated } = metadataStore.getState()
  if (connected && authenticated) start()
  metadataStore.subscribe(
    async (ok: boolean) => {
      info(`[${collection.name}] auth status change`, ok)
      if (ok) await start()
      else await stop()
    },
    (state) => state.connected && state.authenticated
  )

  return { start, stop }
}

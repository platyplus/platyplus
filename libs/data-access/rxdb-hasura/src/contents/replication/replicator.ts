import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { httpUrlToWebSockeUrl } from '@platyplus/data'

import { error, errorDir, info, warn } from '../../console'
import { Contents, ContentsCollection } from '../../types'
import { createHeaders } from '../../utils'
import { pullModifier, pullQueryBuilder } from './pull'
import { pushModifier, pushQueryBuilder } from './push'
import { subscriptionQuery } from './subscribe'
import { getJwt, metadataStore } from '../../metadata'

const DEFAULT_BATCH_SIZE = 5

export const createContentReplicator = async (
  collection: ContentsCollection,
  role: string
): Promise<void> => {
  const db = collection.database
  const url = db.options.url

  let state: RxGraphQLReplicationState<Contents> | undefined
  let wsSubscription: SubscriptionClient | undefined
  let jwtSubscription: () => void | undefined

  const setupGraphQLReplication = async (): Promise<
    RxGraphQLReplicationState<Contents>
  > => {
    const replicationState = collection.syncGraphQL({
      url,
      headers: createHeaders(role, getJwt(), 'admin'),
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

    replicationState.setHeaders(createHeaders(role, getJwt(), 'admin'))
    wsSubscription = setupGraphQLSubscription()
    jwtSubscription = metadataStore.subscribe(
      (token?: string) => {
        replicationState.setHeaders(createHeaders(role, token, 'admin'))
        wsSubscription?.close()
        wsSubscription = setupGraphQLSubscription()
      },
      (state) => state.jwt
    )

    return replicationState
  }

  const setupGraphQLSubscription = (): SubscriptionClient => {
    const wsUrl = httpUrlToWebSockeUrl(url)
    const headers = createHeaders(role, getJwt(), 'admin')
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
        state.run()
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
    jwtSubscription?.()
    wsSubscription?.close()
  }

  if (metadataStore.getState().connected) start()
  metadataStore.subscribe(
    async (connected: boolean) => {
      console.log('connected', connected)
      if (connected) {
        await start()
      } else await stop()
    },
    (state) => state.connected
  )

  collection.replicator = { start, stop }
}

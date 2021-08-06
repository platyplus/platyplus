import { RxChangeEvent } from 'rxdb'
import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql'
import { Subscription } from 'rxjs'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import produce from 'immer'

import { httpUrlToWebSockeUrl } from '@platyplus/data'

import { debug, error, errorDir, warn } from '../../console'
import { createHeaders } from '../../utils'
import { TableFragment } from '../../generated'

import { METADATA_ROLE } from '../constants'
import { getJwt, metadataStore, setCollectionIsReady } from '../store'
import { MetadataCollection } from '../types'

import { subscription } from './graphql'
import { modifier } from './modifier'
import { queryBuilder } from './pull'
import { setMetadataTable } from './store-operations'

export type MetadataReplicatorOptions = {
  url: string
  batchSize?: number
  token?: string
}

// TODO lots of duplicate code with the contents replicator
export const createMetadataReplicator = async (
  metadataCollection: MetadataCollection
): Promise<void> => {
  const db = metadataCollection.database
  const url = db.options.url

  let state: RxGraphQLReplicationState<TableFragment> | undefined
  let wsSubscription: SubscriptionClient | undefined
  let metaSubscription: Subscription | undefined
  let jwtSubscription: () => void | undefined
  let errorSubscription: Subscription | undefined

  const setupGraphQLReplication = async (): Promise<
    RxGraphQLReplicationState<TableFragment>
  > => {
    const replicationState = metadataCollection.syncGraphQL({
      url,
      headers: createHeaders(METADATA_ROLE, getJwt()),
      pull: {
        queryBuilder: queryBuilder(db),
        modifier: modifier(metadataCollection)
      },
      live: true,
      liveInterval: 1000 * 60 * 10, // 10 minutes
      deletedFlag: 'deleted',
      waitForLeadership: true // defaults to true
    })
    replicationState.error$.subscribe((err) => {
      error(`replication error on ${metadataCollection.name}`)
      errorDir(err)
    })
    replicationState.active$.subscribe((active) => {
      if (active) {
        metadataStore.setState(
          produce((state) => {
            state.syncing = true
          })
        )
      } else {
        if (metadataStore.getState().isReady())
          metadataStore.setState(
            produce((state) => {
              state.syncing = false
            })
          )
      }
    })
    replicationState.setHeaders(createHeaders(METADATA_ROLE, getJwt()))
    wsSubscription = setupGraphQLSubscription()
    jwtSubscription = metadataStore.subscribe(
      (token?: string) => {
        debug(`Replicator (${metadataCollection.name}): set token`)
        replicationState.setHeaders(createHeaders(METADATA_ROLE, token))
        wsSubscription?.close()
        wsSubscription = setupGraphQLSubscription()
      },
      (state) => state.jwt
    )

    return replicationState
  }

  const setupGraphQLSubscription = (): SubscriptionClient => {
    debug(`setupGraphQLSubscription ${metadataCollection.name}`)
    const wsUrl = httpUrlToWebSockeUrl(url)
    const headers = createHeaders(METADATA_ROLE, getJwt())
    const wsClient = new SubscriptionClient(wsUrl, {
      reconnect: true,
      connectionParams: {
        headers
      },
      timeout: 1000 * 60,
      reconnectionAttempts: 10000,
      inactivityTimeout: 10 * 1000,
      lazy: true
    })

    const ret = wsClient.request({
      query: subscription
    })

    ret.subscribe({
      next: (data) => {
        debug(`subscription on ${metadataCollection.name} emitted`, data)
        state?.run()
      },
      error: (error) => {
        warn(`subscription ${metadataCollection.name} error`, error)
      }
    })
    return wsClient
  }

  const start = async (): Promise<void> => {
    state = await setupGraphQLReplication()
    metaSubscription = metadataCollection.$.subscribe(
      async ({
        operation,
        documentData,
        previousDocumentData
      }: RxChangeEvent<TableFragment>) => {
        if (operation === 'INSERT') {
          if (documentData.id) {
            setMetadataTable(documentData)
          }
        } else if (operation === 'UPDATE') {
          console.log('Updated metadata', previousDocumentData, documentData)
          // TODO update collection -> run a migration when needed (only when columns change?)
        }
      }
    )
    errorSubscription = state.error$.subscribe((data) => {
      warn('metadata sync error', data)
    })
    state.setHeaders(createHeaders(METADATA_ROLE, getJwt()))
    jwtSubscription = metadataStore.subscribe(
      (token: string | undefined) => {
        debug('Replicator (metadata): set token')
        // TODO change in websocket as well
        state?.setHeaders(createHeaders(METADATA_ROLE, token))
      },
      (state) => state.jwt
    )

    state.awaitInitialReplication().then(() => {
      setCollectionIsReady('metadata')
    })
  }

  const stop = async (): Promise<void> => {
    await state?.cancel()
    metaSubscription?.unsubscribe()
    jwtSubscription?.()
    errorSubscription?.unsubscribe()
    // db.ready$.next(false)
  }

  if (metadataStore.getState().connected) start()
  metadataStore.subscribe(
    async (connected: boolean) => {
      debug('[metadata] auth status change', connected)
      if (connected) {
        await start()
      } else await stop()
    },
    (state) => state.connected
  )

  metadataCollection.replicator = { start, stop }
}

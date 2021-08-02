import { RxChangeEvent } from 'rxdb'
import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql'
import { Subscription } from 'rxjs'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { httpUrlToWebSockeUrl } from '@platyplus/data'

import { debug, error, errorDir, warn } from '../../console'
import { contentsCollectionCreator } from '../../contents'
import { collectionName, createHeaders } from '../../utils'
import { TableFragment } from '../../generated'

import { METADATA_ROLE } from '../constants'
import { MetadataCollection } from '../types'

import { subscription } from './graphql'
import { modifier } from './modifier'
import { queryBuilder } from './pull'
import { setMetadataTable } from './store-operations'
import { metadataStore, setCollectionIsReady } from '../store'

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
  let jwtSubscription: Subscription | undefined
  let errorSubscription: Subscription | undefined

  const setupGraphQLReplication = async (): Promise<
    RxGraphQLReplicationState<TableFragment>
  > => {
    const replicationState = metadataCollection.syncGraphQL({
      url,
      headers: createHeaders(METADATA_ROLE, db.jwt$.getValue()),
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

    jwtSubscription = db.jwt$.subscribe((token?: string) => {
      debug(`Replicator (${metadataCollection.name}): set token`)
      replicationState.setHeaders(createHeaders(METADATA_ROLE, token))
      wsSubscription?.close()
      wsSubscription = setupGraphQLSubscription()
    })

    return replicationState
  }

  const setupGraphQLSubscription = (): SubscriptionClient => {
    debug(`setupGraphQLSubscription ${metadataCollection.name}`)
    const wsUrl = httpUrlToWebSockeUrl(url)
    const headers = createHeaders(METADATA_ROLE, db.jwt$.getValue())
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
      async ({ operation, documentData }: RxChangeEvent<TableFragment>) => {
        // TODO update collection -> run a migration when needed (only when columns change?)
        // if (event.operation === 'INSERT' || event.operation === 'UPDATE') {
        if (operation === 'INSERT') {
          if (documentData.id) {
            setMetadataTable(documentData)
            // TODO determine the roles to which the collection must be created
            // const metaName = metadataName(documentData)
            const roles: string[] = documentData.columns.reduce(
              (acc, column) => {
                for (const permissionType of ['canSelect', 'canInsert']) {
                  for (const { roleName } of column[permissionType]) {
                    !acc.includes(roleName) && acc.push(roleName)
                  }
                }

                return acc
              },
              []
            )
            for (const role of roles) {
              const metadata = documentData as TableFragment
              const name = collectionName(metadata, role)
              await db.addCollections({
                [name]: contentsCollectionCreator(metadata, role)
              })
            }
          }
        }
      }
    )
    errorSubscription = state.error$.subscribe((data) => {
      warn('metadata sync error', data)
    })
    jwtSubscription = db.jwt$.subscribe((token: string | undefined) => {
      debug('Replicator (metadata): set token')
      // TODO change in websocket as well
      state?.setHeaders(createHeaders(METADATA_ROLE, token))
    })
    state.awaitInitialReplication().then(() => {
      setCollectionIsReady('metadata')
    })
  }

  const stop = async (): Promise<void> => {
    await state?.cancel()
    metaSubscription?.unsubscribe()
    jwtSubscription?.unsubscribe()
    errorSubscription?.unsubscribe()
    // db.ready$.next(false)
  }

  db.authStatus$.subscribe(async (status: boolean) => {
    debug('[metadata] auth status change', status)
    if (status) await start()
    else await stop()
  })

  metadataCollection.replicator = { start, stop }
}

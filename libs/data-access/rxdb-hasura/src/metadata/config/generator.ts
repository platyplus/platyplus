import { RxChangeEvent } from 'rxdb'
import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql'
import { Subscription } from 'rxjs'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { httpUrlToWebSockeUrl } from '@platyplus/data'

import { debug, error, errorDir, warn } from '../../console'
import { METADATA_ROLE } from '../constants'
import { contentsCollections } from '../../database'
import { Contents, Database } from '../../types'
import { createHeaders } from '../../utils'

import { generateCollectionSettings } from './settings-generator'
import { CollectionConfig, ConfigCollectionName } from './types'
import { getJwt, metadataStore, setCollectionIsReady } from '../store'

const batchSize = 5

// TODO lots of duplicate code with the other replicators
export const createReplicatedCollection = async (
  db: Database,
  name: ConfigCollectionName,
  config: CollectionConfig
): Promise<void> => {
  const { [name]: collection } = await db.addCollections({
    [name]: {
      schema: config.schema,
      autoMigrate: true
    }
  })
  db.contents$.next(contentsCollections(db))

  const settings = generateCollectionSettings(name, config)
  const url = db.options.url
  let state: RxGraphQLReplicationState<Contents> | undefined
  let wsSubscription: SubscriptionClient | undefined
  let metaSubscription: Subscription | undefined
  let jwtSubscription: () => void | undefined
  let errorSubscription: Subscription | undefined

  const setupGraphQLReplication = async (): Promise<
    RxGraphQLReplicationState<Contents>
  > => {
    const replicationState = collection.syncGraphQL({
      url,
      headers: createHeaders(METADATA_ROLE, getJwt(), 'admin'),
      push: {
        batchSize,
        queryBuilder: settings.pushQueryBuilder,
        modifier: settings.pushModifier
      },
      pull: {
        queryBuilder: settings.pullQueryBuilder
      },
      live: true,
      liveInterval: 1000 * 60 * 10, // 10 minutes
      deletedFlag: 'deleted'
    })
    replicationState.error$.subscribe((err) => {
      error(`replication error on ${collection.name}`)
      errorDir(err)
    })

    replicationState.setHeaders(createHeaders(METADATA_ROLE, getJwt(), 'admin'))
    wsSubscription = setupGraphQLSubscription()
    jwtSubscription = metadataStore.subscribe(
      (token?: string) => {
        debug(`Replicator (${collection.name}): set token`)
        replicationState.setHeaders(
          createHeaders(METADATA_ROLE, token, 'admin')
        )
        wsSubscription?.close()
        wsSubscription = setupGraphQLSubscription()
      },
      (state) => state.jwt
    )

    return replicationState
  }

  const setupGraphQLSubscription = (): SubscriptionClient => {
    debug(`setupGraphQLSubscription ${collection.name}`)
    const wsUrl = httpUrlToWebSockeUrl(url)
    const headers = createHeaders(METADATA_ROLE, getJwt(), 'admin')
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
      query: settings.subscription,
      variables: {
        now: new Date().toUTCString()
      }
    })

    ret.subscribe({
      next: (data) => state?.run(),
      error: (error) => {
        warn(`subscription ${collection.name} error`, error)
      }
    })
    return wsClient
  }

  const start = async (): Promise<void> => {
    state = await setupGraphQLReplication()
    metaSubscription = collection.$.subscribe(
      async ({
        operation,
        documentData,
        previousDocumentData
      }: RxChangeEvent<Contents>) => {
        if (operation === 'INSERT' || operation === 'UPDATE') {
          if (documentData.id) config.onUpsert?.(documentData)
        } else if (operation === 'DELETE') {
          config.onDelete?.(previousDocumentData)
        }
      }
    )
    errorSubscription = state.error$.subscribe((data) => {
      warn(`${collection.name} sync error`, data)
    })
    state.setHeaders(createHeaders(METADATA_ROLE, getJwt(), 'admin'))
    jwtSubscription = metadataStore.subscribe(
      (token?: string) => {
        // TODO change in websocket as well
        state?.setHeaders(createHeaders(METADATA_ROLE, token, 'admin'))
      },
      (state) => state.jwt
    )

    state.awaitInitialReplication().then(() => {
      setCollectionIsReady(name)
    })
  }

  const stop = async (): Promise<void> => {
    await state?.cancel()
    metaSubscription?.unsubscribe()
    jwtSubscription?.()
    errorSubscription?.unsubscribe()
  }

  if (metadataStore.getState().connected) start()
  metadataStore.subscribe(
    async (connected: boolean) => {
      if (connected) {
        await start()
      } else await stop()
    },
    (state) => state.connected
  )
}

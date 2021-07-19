import { RxChangeEvent } from 'rxdb'
import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql'
import { Subscription } from 'rxjs'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import deepEqual from 'deep-equal'

import { httpUrlToWebSockeUrl } from '@platyplus/data'

import { debug, error, errorDir, info, warn } from '../console'
import { contentsCollectionCreator, metadataName } from '../contents'
import { Metadata, MetadataCollection } from '../types'
import { createHeaders } from '../utils'
import { stringQuery, subscription } from './graphql'
import { modifier } from './modifier'
export type MetadataReplicatorOptions = {
  url: string
  batchSize?: number
  token?: string
}

const noopQuery =
  '{metadata_table(where:{_and:[{table_schema: {_eq: "noop"}},{table_schema: {_neq: "noop"}}]}) {table_name}}'

export const createMetadataReplicator = async (
  metadataCollection: MetadataCollection,
  role: string
): Promise<void> => {
  const db = metadataCollection.database
  const url = db.options.url

  let state: RxGraphQLReplicationState | undefined
  let wsSubscription: SubscriptionClient | undefined
  let metaSubscription: Subscription | undefined
  let jwtSubscription: Subscription | undefined
  let errorSubscription: Subscription | undefined

  const setupGraphQLReplication =
    async (): Promise<RxGraphQLReplicationState> => {
      const replicationState = metadataCollection.syncGraphQL({
        url,
        headers: createHeaders(role, db.jwt$.getValue()),
        pull: {
          // ! TODO the approach is a 'bit' brutal: subscribe to the full metadata query,
          // ! fetch it again entirely on every change, then deep compare old and new result...
          // ! Ideally the metadata query would need to get an 'updated_at' field
          // ! ( but it needs to be determined on the postgresql side... )
          // TODO (plus there's a lot of code duplicates with the contents replicator)
          queryBuilder: (doc) => {
            return {
              query:
                doc && !db[`${role}_${metadataName(doc)}`]
                  ? noopQuery
                  : stringQuery,
              variables: {}
            }
          },
          modifier: async (doc) => {
            const oldDoc = await metadataCollection.findOne(doc.id).exec()
            const newDoc = modifier(doc)
            if (oldDoc && deepEqual(newDoc, oldDoc.toJSON())) return null
            else return newDoc
          }
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
        replicationState.setHeaders(createHeaders(role, token))
        wsSubscription?.close()
        wsSubscription = setupGraphQLSubscription()
      })

      return replicationState
    }

  const setupGraphQLSubscription = (): SubscriptionClient => {
    info(`setupGraphQLSubscription ${metadataCollection.name}`)
    const wsUrl = httpUrlToWebSockeUrl(url)
    const headers = createHeaders(role, db.jwt$.getValue())
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
        info(`subscription on ${metadataCollection.name} emitted`, data)
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
      async (event: RxChangeEvent<Metadata>) => {
        // TODO update collection -> run a migration when needed (only when columns change?)
        // if (event.operation === 'INSERT' || event.operation === 'UPDATE') {
        if (event.operation === 'INSERT') {
          const metadataDoc = await db.collections[event.collectionName]
            .findOne(event.documentId)
            .exec()
          const collectionName = `${role}_${metadataName(event.documentData)}`
          await db.addCollections({
            [collectionName]: contentsCollectionCreator(metadataDoc, role)
          })
        }
      }
    )
    errorSubscription = state.error$.subscribe((data) => {
      warn('metadata sync error', data)
    })
    jwtSubscription = db.jwt$.subscribe((token: string | undefined) => {
      debug('Replicator (metadata): set token')
      // TODO change in websocket as well
      state?.setHeaders(createHeaders(role, token))
    })
    // await state.awaitInitialReplication()
    // TODO recreate collections when using indexeddb?
    // const existingCollections = await metadata.find().exec()
    // for (const collection of existingCollections) {
    //   const table = collection.toJSON()
    //   await metadata.database.addCollections({
    //     [metadataName(table)]: contentsCollectionCreator(table, role)
    //   })
    // }
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

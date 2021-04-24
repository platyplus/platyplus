import { RxChangeEvent, SyncOptionsGraphQL } from 'rxdb'

import { print } from 'graphql/language/printer'
import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql'
import { Subscription } from 'rxjs'

import { debug, warn } from '../console'
import { contentsCollectionCreator, metadataName } from '../contents'
import { Database, Metadata, MetadataCollection } from '../types'
import { createHeaders } from '../utils'
import docQuery from './metadata'

export type MetadataReplicatorOptions = {
  url: string
  batchSize?: number
  token?: string
}

const query = print(docQuery)
const noopQuery =
  '{metadata_table(where:{_and:[{table_schema: {_eq: "noop"}},{table_schema: {_neq: "noop"}}]}) {table_name}}'

const createMetadataReplicatorOptions = (
  db: Database,
  role: string
): SyncOptionsGraphQL => {
  return {
    url: db.options.url,
    headers: createHeaders(role, db.jwt$.getValue()),
    pull: {
      queryBuilder: (doc) => ({
        query: doc ? noopQuery : query,
        variables: {}
      })
    },
    live: true,
    liveInterval: 1000 * 60 * 10, // 10 minutes
    deletedFlag: 'deleted' // ? not in use
  }
}

export const createMetadataReplicator = async (
  metadata: MetadataCollection,
  role: string
): Promise<void> => {
  const db = metadata.database

  let state: RxGraphQLReplicationState | undefined
  let metaSubscription: Subscription | undefined
  let jwtSubscription: Subscription | undefined
  let errorSubscription: Subscription | undefined

  const start = async (): Promise<void> => {
    state = metadata.syncGraphQL(createMetadataReplicatorOptions(db, role))
    // state.active$.pipe(skip(1)).subscribe(loading => {
    //   if (!loading) db.ready$.next(true)
    // })
    metaSubscription = metadata.$.subscribe(
      async (event: RxChangeEvent<Metadata>) => {
        if (event.operation === 'INSERT' || event.operation === 'UPDATE') {
          const collectionName = `${role}_${metadataName(event.documentData)}`

          await metadata.database.addCollections({
            [collectionName]: contentsCollectionCreator(
              event.documentData,
              role
            )
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
    await state.awaitInitialReplication()
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

  metadata.replicator = { start, stop }
}

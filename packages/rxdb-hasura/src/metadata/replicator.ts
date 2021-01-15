import { RxChangeEvent, SyncOptionsGraphQL } from 'rxdb'

export type MetadataReplicatorOptions = {
  url: string
  batchSize?: number
  token?: string
}
import { print } from 'graphql/language/printer'
import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql'
import { Subscription } from 'rxjs'
import { skip } from 'rxjs/operators'

import { debug, warn } from '../console'
import { contentsCollectionCreator } from '../contents/collection-creator'
import { metadataName } from '../helpers'
import { Database, Metadata, MetadataCollection } from '../types'
import docQuery from './metadata.graphql'

const query = print(docQuery)
const noopQuery =
  '{metadata_table(where:{_and:[{table_schema: {_eq: "noop"}},{table_schema: {_neq: "noop"}}]}) {table_name}}'

const createMetadataReplicatorOptions = (db: Database): SyncOptionsGraphQL => {
  const token = db.jwt$.getValue()
  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {}
  return {
    url: db.options.url,
    headers,
    pull: {
      queryBuilder: doc => ({
        query: doc ? noopQuery : query,
        variables: {}
      }),
      modifier: doc => ({ ...doc, full_name: metadataName(doc) })
    },
    live: true,
    liveInterval: 1000 * 60 * 10, // 10 minutes
    deletedFlag: 'deleted' // ? not in use
  }
}

export const createMetadataReplicator = async (
  metadata: MetadataCollection
): Promise<void> => {
  const db = metadata.database

  let state: RxGraphQLReplicationState | undefined
  let metaSubscription: Subscription | undefined
  let jwtSubscription: Subscription | undefined
  let errorSubscription: Subscription | undefined

  const start = async (): Promise<void> => {
    state = metadata.syncGraphQL(createMetadataReplicatorOptions(db))
    state.active$.pipe(skip(1)).subscribe(loading => db.ready$.next(!loading))
    metaSubscription = metadata.$.subscribe(
      async (event: RxChangeEvent<Metadata>) => {
        if (event.operation === 'INSERT' || event.operation === 'UPDATE') {
          await metadata.database.addCollections({
            [event.documentId]: contentsCollectionCreator(event.documentData)
          })
        }
      }
    )
    errorSubscription = state.error$.subscribe(data => {
      warn('metadata sync error', data)
    })
    jwtSubscription = db.jwt$.subscribe((token: string | undefined) => {
      debug('Replicator (metadata): set token')
      // TODO change in websocket as well
      const headers = state?.headers || {}
      if (token) headers.Authorization = `Bearer ${token}`
      else delete headers.Authorization
      state?.setHeaders(headers)
    })
    await state.awaitInitialReplication()
  }

  const stop = async (): Promise<void> => {
    await state?.cancel()
    metaSubscription?.unsubscribe()
    jwtSubscription?.unsubscribe()
    errorSubscription?.unsubscribe()
  }

  db.authStatus$.subscribe(async (status: boolean) => {
    if (status) await start()
    else await stop()
  })

  metadata.replicator = { start, stop }
}

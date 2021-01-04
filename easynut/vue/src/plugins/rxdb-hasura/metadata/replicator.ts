import {
  RxChangeEvent,
  RxCollection,
  RxDatabase,
  SyncOptionsGraphQL
} from 'rxdb'

export type MetadataReplicatorOptions = {
  url: string
  batchSize?: number
  token?: string
}
import { print } from 'graphql/language/printer'
import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql'
import { Subscription } from 'rxjs'

import { debug, warn } from '../console'
import { fullTableName, toJsonSchema } from '../helpers'
import docQuery from './metadata.graphql'

const query = print(docQuery)
const noopQuery =
  '{metadata_table(where:{_and:[{table_schema: {_eq: "noop"}},{table_schema: {_neq: "noop"}}]}) {table_name}}'

const createMetadataReplicatorOptions = (
  db: RxDatabase
): SyncOptionsGraphQL => {
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
      modifier: doc => ({ ...doc, full_name: fullTableName(doc) })
    },
    live: true,
    liveInterval: 1000 * 60 * 10, // 10 minutes
    deletedFlag: 'deleted' // ? not in use
  }
}

export const createMetadataReplicator = async (
  metadata: RxCollection
): Promise<void> => {
  const db = metadata.database as RxDatabase

  let state: RxGraphQLReplicationState | undefined
  let metaSubscription: Subscription | undefined
  let jwtSubscription: Subscription | undefined
  let errorSubscription: Subscription | undefined

  const start = async (): Promise<void> => {
    state = metadata.syncGraphQL(createMetadataReplicatorOptions(db))
    metaSubscription = metadata.$.subscribe(async (event: RxChangeEvent) => {
      if (event.operation === 'INSERT' || event.operation === 'UPDATE') {
        await metadata.database.addCollections({
          [event.documentId]: {
            schema: toJsonSchema(event.documentData),
            options: { metadata: event.documentData }
          }
        })
      }
    })
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

  db.status$.subscribe(async (status: boolean) => {
    if (status) await start()
    else await stop()
  })

  metadata.replicator = { start, stop }
}

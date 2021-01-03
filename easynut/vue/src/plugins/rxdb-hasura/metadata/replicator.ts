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

import { fullTableName, toJsonSchema } from '../helpers'
import docQuery from './metadata.graphql'

const query = print(docQuery)
const noopQuery =
  '{metadata_table(where:{_and:[{table_schema: {_eq: "noop"}},{table_schema: {_neq: "noop"}}]}) {table_name}}'

const createMetadataReplicatorOptions = ({
  url,
  token
}: MetadataReplicatorOptions): SyncOptionsGraphQL => ({
  url,
  headers: {
    Authorization: `Bearer ${token}`
  },
  pull: {
    queryBuilder: doc => ({
      query: doc ? noopQuery : query,
      variables: {}
    }),
    modifier: doc => {
      doc.full_name = fullTableName(doc)
      return doc
    }
  },
  live: true,
  liveInterval: 1000 * 60 * 10, // 10 minutes
  deletedFlag: 'deleted'
})
export const createMetadataReplicator = async (
  metadata: RxCollection
): Promise<void> => {
  const state = metadata.syncGraphQL(
    createMetadataReplicatorOptions(metadata.database.options)
  )
  metadata.$.subscribe(async (event: RxChangeEvent) => {
    if (event.operation === 'INSERT' || event.operation === 'UPDATE') {
      await metadata.database.addCollections({
        [event.documentId]: {
          schema: toJsonSchema(event.documentData),
          options: { metadata: event.documentData }
        }
      })
    }
  })
  state.error$.subscribe(data => {
    console.warn('metadata sync error', data)
  })

  const db = metadata.database as RxDatabase
  db.jwt$.subscribe((token: string) => {
    console.log('Replicator (metadata): set token')
    // TODO change in websocket as well
    const authorization = token && `Bearer ${token}`
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { Authorization, ...headers } = state.headers
    if (authorization) headers['Authorization'] = authorization
    state.setHeaders(headers)
  })

  const stop = async (): Promise<void> => {
    await state.cancel()
  }

  await state.awaitInitialReplication()
  metadata.replicator = { stop }
}

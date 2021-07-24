import { RxDatabase, RxGraphQLReplicationQueryBuilder } from 'rxdb'
import { Metadata } from '../types'
import { metadataName } from '../utils'
import { stringQuery } from './graphql'

const noopQuery =
  '{metadata_table(where:{_and:[{table_schema: {_eq: "noop"}},{table_schema: {_neq: "noop"}}]}) {table_name}}'

// ! TODO the approach is a 'bit' brutal: subscribe to the full metadata query,
// ! fetch it again entirely on every change, then deep compare old and new result...
// ! Ideally the metadata query would need to get an 'updated_at' field
// ! ( but it needs to be determined on the postgresql side... )
export const queryBuilder =
  (db: RxDatabase, role: string): RxGraphQLReplicationQueryBuilder =>
  (doc: Metadata) => ({
    query:
      doc && // * Do not load metadata (again) when metadata collection already exists
      !db[`${role}_${metadataName(doc)}`]
        ? noopQuery
        : stringQuery,
    variables: {}
  })

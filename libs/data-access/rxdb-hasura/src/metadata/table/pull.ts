import { RxDatabase, RxGraphQLReplicationQueryBuilder } from 'rxdb'
import { metadataName } from '../../utils'
import { stringQuery } from './graphql'
import { TableFragment } from '../../generated'

const noopQuery = '{metadata_table(where:{_not:{}}) {name}}'

// ! TODO the approach is a 'bit' brutal: subscribe to the full metadata query,
// ! fetch it again entirely on every change, then deep compare old and new result...
// ! Ideally the metadata query would need to get an 'updated_at' field
// ! ( but it needs to be determined on the postgresql side... )
export const queryBuilder =
  (db: RxDatabase): RxGraphQLReplicationQueryBuilder =>
  (doc: TableFragment) => ({
    query:
      doc && // * Do not load metadata (again) when metadata collection already exists
      !db[metadataName(doc)]
        ? noopQuery
        : stringQuery,
    variables: {}
  })

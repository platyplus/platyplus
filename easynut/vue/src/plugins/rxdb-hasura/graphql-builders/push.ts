import { RxGraphQLReplicationQueryBuilder } from 'rxdb'

import { TableFragment } from '../../../generated'
import { fullTableName } from '../helpers'

export const pushQueryBuilder = (
  table: TableFragment
): RxGraphQLReplicationQueryBuilder => {
  const title = fullTableName(table)
  const primaryKey = table.primaryKey?.constraint_name
  const updateColumns = table.columns
    .filter(col => col.canUpdate.length)
    .map(col => col.column_name)
  return (doc: Record<string, unknown>) => {
    const query = `mutation upsert${title} ($objects: [${title}_insert_input!]!) {
        insert_${title} (
            objects: $objects,
            on_conflict: {
                constraint: ${primaryKey},
                update_columns: [${updateColumns.join(',')}]
            }){
            returning {
              id
            }
          }
   }`
    const variables = {
      objects: doc
    }
    return {
      query,
      variables
    }
  }
}

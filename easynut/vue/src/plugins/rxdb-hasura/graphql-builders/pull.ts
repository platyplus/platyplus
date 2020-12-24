import { RxGraphQLReplicationQueryBuilder } from 'rxdb'

import { TableFragment } from '../../../generated'
import { fullTableName } from '../helpers'

export const pullQueryBuilder = (
  table: TableFragment,
  batchSize: number
): RxGraphQLReplicationQueryBuilder => {
  const properties = table.columns
    .filter(column => column.canSelect.length)
    .map(col => col.column_name)
  const title = fullTableName(table)

  return (doc: { updated_at: string }) => {
    if (!doc) {
      doc = {
        updated_at: new Date(0).toUTCString()
      }
    }
    // const includeId = doc.id ? `{ id: {_eq: "${doc.id}"} }` : ''
    const query = `{
            ${title} (
                  where: {
                       _and: [
                        { updated_at: { _gt: "${doc.updated_at}" } }
                       ]
                    },
                  limit: ${batchSize},
                  order_by: [ {updated_at: asc} ]
            ){
                ${properties.join(' ')}

            }
        }`
    return {
      query,
      variables: {}
    }
  }
}

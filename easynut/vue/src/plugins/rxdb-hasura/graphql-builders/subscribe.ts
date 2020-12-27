import { TableFragment } from '../../../generated'
import { fullTableName } from '../helpers'

export const subscriptionQuery = (table: TableFragment): string => {
  const title = fullTableName(table)
  // TODO limit: 1
  return `subscription on${title} {
    ${title} (
        where: {
            updated_at: { _gt: "${new Date(Date.now()).toUTCString()}" }
        }
        order_by: { updated_at: asc }
    ){
        id
    }
}`
}

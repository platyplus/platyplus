import { jsonToGraphQLQuery, EnumType } from 'json-to-graphql-query'
import { getCollectionTableInfo } from '../../store'
import { ContentsCollection } from '../../types'
import { tableName } from '../../utils'

export const subscriptionQuery = (collection: ContentsCollection): string => {
  const table = getCollectionTableInfo(collection)
  const title = tableName(table)
  const now = new Date().toUTCString()
  const arrayRels = table.metadata.array_relationships.map(({ name }) => name)

  const query = jsonToGraphQLQuery({
    subscription: {
      __name: `on${title}`,
      [title]: {
        __args: {
          where: {
            _or: [
              { updated_at: { _gt: now } },
              ...arrayRels.map((rel) => ({
                [rel]: { updated_at: { _gt: now } }
              }))
            ]
          },
          order_by: { updated_at: new EnumType('asc') }
        },
        updated_at: true,
        ...arrayRels.reduce((acc, rel) => {
          acc[`${rel}_aggregate`] = {
            aggregate: { max: { updated_at: true } }
          }
          return acc
        }, {})
      }
    }
  })
  return query
}

import { jsonToGraphQLQuery, EnumType } from 'json-to-graphql-query'
import { ContentsCollection } from '../../types'
import { metadataName } from '../schema'
// TODO optimize the subscription to its minimum
export const subscriptionQuery = (collection: ContentsCollection): string => {
  const table = collection.metadata
  const title = metadataName(table)
  // TODO limit: 1
  const now = new Date().toUTCString()
  const arrayRels = table.relationships
    .filter((rel) => rel.rel_type === 'array')
    .map((rel) => rel.rel_name)

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
          acc[rel] = {
            updated_at: true
          }
          acc[`${rel}_aggregate`] = {
            aggregate: { max: { updated_at: true }, count: true }
          }
          return acc
        }, {})
      }
    }
  })
  return query
}

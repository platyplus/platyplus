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

  const fields = [
    collection.schema.primaryPath,
    'updated_at',
    ...arrayRels.map(
      (rel) => `${rel} { id updated_at }
    ${rel}_aggregate { aggregate { max { updated_at } count } }`
    )
  ].join(' ')
  const orConditions = [
    `{ updated_at: { _gt: "${now}" }}`,
    ...arrayRels.map((rel) => `{${rel}: { updated_at: { _gt: "${now}" } } }`)
  ].join('\n')
  return `subscription on${title} {
    ${title} (
        where: {
            _or: [${orConditions}]
        }
        order_by: { updated_at: asc }
    ){ ${fields} }
}`
}

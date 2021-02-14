import deepmerge from 'deepmerge'
import { RxGraphQLReplicationQueryBuilder } from 'rxdb'

import { debug } from '../../console'
import { Contents, ContentsCollection, Modifier } from '../../types'
import {
  FieldMap,
  objectSchemaToGraphqlFields,
  rxdbJsonataPaths
} from '../../utils'
import { label } from '../computed-fields/label'
import { addComputedFieldsFromLoadedData } from '../computed-fields/utils'
import { filteredRelationships, metadataName } from '../schema'

export const pullQueryBuilder = (
  collection: ContentsCollection,
  batchSize: number
): RxGraphQLReplicationQueryBuilder => {
  const table = collection.metadata
  const title = metadataName(table)

  // * Get the list of array relationship names
  const arrayRelationships = table.relationships
    .filter(rel => rel.rel_type === 'array')
    .map(relationship => relationship.rel_name as string)

  const columns =
    collection.role === 'admin'
      ? table.columns
      : table.columns.filter(column => column.canSelect.length)
  const fieldsObject = deepmerge.all<FieldMap>([
    // * Column fields
    columns.reduce<FieldMap>(
      (aggr, curr) => ((aggr[curr.column_name as string] = true), aggr),

      {}
    ),
    // * Add fields required for array relationships
    // * - keys as per defined in the relationship mapping
    // * - aggregate (last updated_at) so when it changes it will trigger a new pull
    ...table.relationships
      .filter(
        rel => rel.rel_type === 'array' && rel.mapping.length === 1 // * filter multi-columns relationships
      )
      .map(
        relationship =>
          ({
            [relationship.rel_name as string]: relationship.mapping
              .map(item => item.column?.column_name)
              .reduce<FieldMap>(
                (aggr, curr) => ((aggr[curr as string] = true), aggr),
                {}
              ),
            [`${relationship.rel_name}_aggregate`]: {
              aggregate: { max: { updated_at: true } }
            }
          } as FieldMap)
      ),
    // * Add fields required for computed properties
    ...table.computedProperties
      .filter(prop => prop.transformation)
      .map(prop => rxdbJsonataPaths(prop.transformation as string, collection))
  ])

  const orConditions = [
    // * Include the latest documents
    '{ updated_at: { _gt: $updatedAt } }',
    '{ updated_at: { _eq: $updatedAt }, id: { _gt: $id } }',
    // TODO check
    ...arrayRelationships.map(
      rel => `{ _and: [
    {${rel}: { updated_at: { _gt: $updated_at_${rel} } } }
    {id: { _eq: $id } }
  ]}`
    )
  ]

  // * Always ask for an updatedAt variable
  const variableDeclarations = [
    ['id', 'uuid'],
    ['updatedAt', 'timestamptz'],
    // TODO doesn't work when a relationship item has been removed (same pb in the subscription)
    ...arrayRelationships.map(rel => [`updated_at_${rel}`, 'timestamptz'])
  ]
    .map(([name, type]) => `$${name}: ${type}`)
    .join(', ')

  // * Ask for the doc it when re-fetching a document
  // TODO get the name/type from the schema, rather than hard coding 'id'

  const orderBy = [
    ['updated_at', 'asc'],
    ['id', 'asc']
  ]

  const strOrderBy = orderBy
    .map(([field, order]) => `${field}: ${order}`)
    .join(',')

  const query = `query query${title} (${variableDeclarations}){
      ${title} (
            where: {
                 _or: [${orConditions}]
              },
            limit: ${batchSize},
            order_by: {${strOrderBy}}
      )${objectSchemaToGraphqlFields(fieldsObject)}
  }`

  return doc => {
    const res = {
      query,
      variables: arrayRelationships.reduce<Partial<Contents>>(
        // * add the existing updated_at array relationship aggregates if they exist
        (variables, rel) => (
          (variables[`updated_at_${rel}`] =
            doc?.[`${arrayRelationships}_aggregate`]?.aggregate?.max
              ?.updated_at || new Date(0).toISOString()),
          variables
        ),
        {
          // * Add the doc timestamp if it exists, set to minimum otherwise
          updatedAt: doc?.updated_at || new Date(0).toISOString(),
          // * Add the doc id if exists
          id: doc?.id || '00000000-0000-0000-0000-000000000000'
        }
      )
    }
    return res
  }
}

export const pullModifier = (collection: ContentsCollection): Modifier => {
  const cleansedRelationships = filteredRelationships(collection.metadata).map(
    ({ rel_type, rel_name, mapping }) => ({
      multiple: rel_type === 'array',
      name: rel_name as string,
      column: mapping[0].column?.column_name as string
    })
  )
  return async data => {
    debug('pullModifier: in', { ...data })
    data.label = label(data, collection) || ''
    data = addComputedFieldsFromLoadedData(data, collection)
    // * Flatten relationship data so it fits in the `population` system
    for (const { name, column, multiple } of cleansedRelationships) {
      if (multiple) {
        // * Array relationships: set remote id columns as an array
        data[name] = (data[name] as []).map(item => item[column])
      } else {
        // * Object relationships: move foreign key columns to the property name
        data[name] = data[column]
        delete data[column]
      }
    }
    debug('pullModifier: out', { ...data })
    return data
  }
}

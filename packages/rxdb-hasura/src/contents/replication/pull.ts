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
import { metadataName } from '../schema'

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

  const fieldsObject = deepmerge.all<FieldMap>([
    // * Column fields
    table.columns
      .filter(column => column.canSelect.length)
      .reduce<FieldMap>(
        (aggr, curr) => ((aggr[curr.column_name as string] = true), aggr),

        {}
      ),
    // * Add fields required for array relationships
    // * - keys as per defined in the relationship mapping
    // * - aggregate (last updated_at) so when it changes it will trigger a new pull
    ...table.relationships
      .filter(rel => rel.rel_type === 'array' && rel.mapping.length)
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

  // * Include the latest documents
  const commonOrConditions = ['{ updated_at: { _gt: $updatedAt } }']

  // * If no doc is passed on, also include docs to which array relationships have been updated
  const initialOrConditions = [
    ...commonOrConditions,
    ...arrayRelationships.map(
      rel => `{${rel}: { updated_at: { _gt: $updated_at_${rel} } } }`
    )
  ].join('\n')

  // * Same as above, but also ask for the doc id
  // TODO doesn't work when a relationship item has been removed (same pb in the subscription)
  const updateOrConditions = [
    ...commonOrConditions,
    ...arrayRelationships.map(
      rel => `{ _and: [
    {${rel}: { updated_at: { _gt: $updated_at_${rel} } } }
    {id: { _eq: $id } }
  ]}`
    )
  ]

  // * Always ask for an updatedAt variable
  const commonVariableDeclarations = [
    ['updatedAt', 'timestamptz'],
    ...arrayRelationships.map(rel => [`updated_at_${rel}`, 'timestamptz'])
  ]

  // * Ask for the doc it when re-fetching a document
  // TODO get the name/type from the schema, rather than hard coding 'id'
  const updateVariableDeclarations = [
    ['id', 'uuid'],
    ...commonVariableDeclarations
  ]
    .map(([name, type]) => `$${name}: ${type}`)
    .join(', ')

  const initialVariableDeclarations = commonVariableDeclarations
    .map(([name, type]) => `$${name}: ${type}`)
    .join(', ')

  // * Query definition when no document is passed on by the replicator
  const initialQuery = `query query${title} (${initialVariableDeclarations}){
      ${title} (
            where: {
                 _or: [${initialOrConditions}]
              },
            limit: ${batchSize},
            order_by: [ {updated_at: asc} ]
      )${objectSchemaToGraphqlFields(fieldsObject)}
  }`
  // * Query definition when the replicator sent a document
  const updateQuery = `query query${title} (${updateVariableDeclarations}){
    ${title} (
          where: {
               _or: [${updateOrConditions}]
            },
          limit: ${batchSize},
          order_by: [ {updated_at: asc} ]
    )${objectSchemaToGraphqlFields(fieldsObject)}
}`

  return doc => ({
    query: doc ? updateQuery : initialQuery,

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
        id: doc?.id
      }
    )
  })
}

export const pullModifier = (collection: ContentsCollection): Modifier => {
  const table = collection.metadata
  const cleansedRelationships = table.relationships
    .filter(relationship => relationship.mapping.length)
    .map(rel => {
      return {
        multiple: rel.rel_type === 'array',
        name: rel.rel_name as string,
        column: rel.mapping[0].column?.column_name as string,
        remoteColumn: rel.mapping[0].remote_column_name as string
      }
    })

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

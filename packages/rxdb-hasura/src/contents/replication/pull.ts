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
import {
  filteredRelationships,
  graphQLColumnType,
  metadataName
} from '../schema'
import { getId } from '../schema/id'

export const pullQueryBuilder = (
  collection: ContentsCollection,
  batchSize: number
): RxGraphQLReplicationQueryBuilder => {
  const table = collection.metadata
  const title = metadataName(table)
  const idKey = getId(collection.metadata)
  // * Get the list of array relationship names
  const arrayRelationships = table.relationships
    .filter(rel => rel.rel_type === 'array')
    .map(relationship => relationship.rel_name as string)

  // * List columns referencing other tables, except its own primary key
  const foreignKeyColumns = table.relationships.reduce<string[]>(
    (aggr, curr) => {
      aggr.push(
        ...curr.mapping.reduce<string[]>((mAggr, mCurr) => {
          if (mCurr.column?.column_name !== idKey)
            mAggr.push(mCurr.column?.column_name as string)
          return mAggr
        }, [])
      )
      return aggr
    },
    []
  )
  const columns = (collection.role === 'admin'
    ? table.columns
    : table.columns.filter(column => column.canSelect.length)
  )
    // * Filter out columns referencing other tables
    .filter(column => !foreignKeyColumns.includes(column.column_name as string))

  const objectRelationshipFields = filteredRelationships(table)
    .filter(rel => rel.rel_type === 'object')
    .map(
      relationship =>
        ({
          [relationship.rel_name as string]: relationship.mapping
            .map(item => item.remote_column_name)
            .reduce<FieldMap>(
              (aggr, curr) => ((aggr[curr as string] = true), aggr),
              { updated_at: true }
            )
        } as FieldMap)
    )
  // * - keys as per defined in the relationship mapping
  // * - aggregate (last updated_at) so when it changes it will trigger a new pull
  const arrayRelationshipFields = filteredRelationships(table)
    .filter(rel => rel.rel_type === 'array')
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
    )

  const fieldsObject = deepmerge.all<FieldMap>([
    // * Column fields
    columns.reduce<FieldMap>(
      (aggr, curr) => ((aggr[curr.column_name as string] = true), aggr),

      {}
    ),
    // * Add fields required for array relationships
    ...arrayRelationshipFields,
    // * Add fields required for object relationships
    ...objectRelationshipFields,
    // * Add fields required for computed properties
    ...table.computedProperties
      .filter(prop => prop.transformation)
      .map(prop => rxdbJsonataPaths(prop.transformation as string, collection))
  ])

  const orConditions = [
    // * Include the latest documents
    '{ updated_at: { _gt: $updatedAt } }',
    `{ updated_at: { _eq: $updatedAt }, ${idKey}: { _gt: $id } }`,
    // TODO check
    ...arrayRelationships.map(
      rel => `{ _and: [
      {${rel}: { updated_at: { _gt: $updated_at_${rel} } } }
      {id: { _eq: $id } }
    ]}`
      // ? add conditions on object relationships?
    )
  ]
  const idColumn = collection.metadata.columns.find(
    ({ column_name }) => column_name === idKey
  )
  const variableDeclarations = [
    [idKey, graphQLColumnType(idColumn)],
    // * Always ask for an updatedAt variable
    ['updatedAt', 'timestamptz'],
    // TODO doesn't work when a relationship item has been removed (same pb in the subscription)
    ...arrayRelationships.map(rel => [`updated_at_${rel}`, 'timestamptz'])
  ]
    .map(([name, type]) => `$${name}: ${type}`)
    .join(', ')

  const orderBy = [
    ['updated_at', 'asc'],
    [idKey, 'asc']
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
          id: doc?.[idKey] || '00000000-0000-0000-0000-000000000000'
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
      key: (rel_type === 'array'
        ? mapping[0].column?.column_name
        : mapping[0].remote_column_name) as string
    })
  )
  return async data => {
    debug('pullModifier: in', collection.name, { ...data })
    data.label = label(data, collection) || ''
    data = addComputedFieldsFromLoadedData(data, collection)
    // * Flatten relationship data so it fits in the `population` system
    for (const { name, key, multiple } of cleansedRelationships) {
      if (multiple) {
        // * Array relationships: set remote id columns as an array
        data[name] = (data[name] as []).map(item => item[key])
      } else {
        // * Object relationships: move foreign key columns to the property name
        if (data[name]) data[name] = data[name][key]
      }
    }
    debug('pullModifier: out', collection.name, { ...data })
    return data
  }
}

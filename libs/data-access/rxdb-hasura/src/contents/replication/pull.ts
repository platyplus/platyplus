import deepmerge from 'deepmerge'
import { RxGraphQLReplicationQueryBuilder } from 'rxdb'
import {
  jsonToGraphQLQuery,
  VariableType,
  EnumType
} from 'json-to-graphql-query'

import { reduceArrayValues, reduceStringArrayValues } from '@platyplus/data'

import { debug } from '../../console'
import { Contents, ContentsCollection, Modifier } from '../../types'
import { FieldMap, metadataName, rxdbJsonataPaths } from '../../utils'
import {
  addComputedFieldsFromLoadedData,
  documentLabel
} from '../computed-fields'
import { filteredRelationships, graphQLColumnType, getIds } from '../schema'

export const pullQueryBuilder = (
  collection: ContentsCollection,
  batchSize: number
): RxGraphQLReplicationQueryBuilder => {
  const table = collection.metadata
  const title = metadataName(table)
  const idKeys = getIds(table)
  // * Get the list of array relationship names
  const arrayRelationships = table.relationships.filter(
    (rel) => rel.rel_type === 'array'
  )

  // * List columns referencing other tables, except its own primary key
  const foreignKeyColumns = table.relationships.reduce<string[]>(
    (aggr, curr) => {
      aggr.push(
        ...curr.mapping.reduce<string[]>((mAggr, mCurr) => {
          if (!idKeys.includes(mCurr.column?.name))
            mAggr.push(mCurr.column?.name)
          return mAggr
        }, [])
      )
      return aggr
    },
    []
  )
  const columns = (
    collection.role === 'admin'
      ? table.columns
      : table.columns.filter((column) => column.canSelect.length)
  )
    // * Filter out columns referencing other tables
    .filter((column) => !foreignKeyColumns.includes(column.name))

  const objectRelationshipFields = filteredRelationships(table)
    .filter((rel) => rel.rel_type === 'object')
    .map(
      (relationship) =>
        ({
          [relationship.rel_name]: reduceArrayValues(
            relationship.mapping,
            ({ remoteColumnName }) => [remoteColumnName, true]
          )
        } as FieldMap)
    )
  // * - keys as per defined in the relationship mapping
  // * - aggregate (last updated_at) so when it changes it will trigger a new pull
  const arrayRelationshipFields = filteredRelationships(table)
    .filter((rel) => rel.rel_type === 'array')
    .map(
      (relationship) =>
        ({
          [relationship.rel_name]:
            relationship.remoteTable.primaryKey.columns.reduce(
              (acc, column) => {
                acc[column.columnName] = true
                return acc
              },
              {
                __args: {
                  where: {
                    deleted: {
                      _eq: false
                    }
                  }
                }
              }
            ),
          [`${relationship.rel_name}_aggregate`]: {
            aggregate: { max: { updated_at: true } }
          }
        } as FieldMap)
    )

  const fieldsObject = deepmerge.all<FieldMap>([
    // * Column fields
    reduceArrayValues(columns, ({ name }) => [name, true]),
    // * Add fields required for array relationships
    ...arrayRelationshipFields,
    // * Add fields required for object relationships
    ...objectRelationshipFields,
    // * Add fields required for computed properties
    ...table.computedProperties
      .filter((prop) => prop.transformation)
      .map((prop) => rxdbJsonataPaths(prop.transformation, collection))
  ])

  const idColumns = table.columns.filter(({ name }) => idKeys.includes(name))

  const query = jsonToGraphQLQuery({
    query: {
      __name: `query${title}`,
      __variables: {
        updatedAt: 'timestamptz',
        ...reduceArrayValues(idColumns, (column) => [
          column.name,
          graphQLColumnType(column)
        ]),
        ...reduceArrayValues(arrayRelationships, (rel) => [
          `updated_at_${rel.rel_name}`,
          'timestamptz'
        ])
      },
      [title]: {
        __args: {
          where: {
            _or: [
              { updated_at: { _gt: new VariableType('updatedAt') } },
              {
                _and: [
                  { updated_at: { _eq: new VariableType('updatedAt') } },
                  ...idKeys.map((key) => ({
                    [key]: { _gt: new VariableType(key) }
                  }))
                ]
              },
              ...arrayRelationships.map(
                (rel) => ({
                  _and: [
                    {
                      [rel.rel_name]: {
                        updated_at: {
                          _gt: new VariableType(`updated_at_${rel.rel_name}`)
                        }
                      }
                    },
                    ...rel.mapping.map((mapping) => ({
                      [mapping.column.name]: {
                        _eq: new VariableType(mapping.column.name)
                      }
                    }))
                  ]
                })
                // ? add conditions on object relationships?
              )
            ]
          },
          limit: batchSize,
          order_by: {
            updated_at: new EnumType('asc'),
            ...reduceStringArrayValues(idKeys, () => new EnumType('asc'))
          }
        },
        ...fieldsObject
      }
    }
  })

  return (doc) => {
    const res = {
      query,
      variables: arrayRelationships.reduce<Partial<Contents>>(
        // * add the existing updated_at array relationship aggregates if they exist
        (variables, rel) => {
          variables[`updated_at_${rel.rel_name}`] =
            doc?.[`${rel.rel_name}_aggregate`]?.aggregate?.max?.updated_at ||
            new Date(0).toISOString()
          return variables
        },
        {
          // * Add the doc timestamp if it exists, set to minimum otherwise
          updatedAt: doc?.updated_at || new Date(0).toISOString(),
          // * Add the doc id if exists
          ...reduceStringArrayValues(
            idKeys,
            (key) => doc?.[key] || '00000000-0000-0000-0000-000000000000'
          )
        }
      )
    }
    return res
  }
}

export const pullModifier = (collection: ContentsCollection): Modifier => {
  const cleansedRelationships = filteredRelationships(collection.metadata).map(
    ({ rel_type, rel_name }) => ({
      multiple: rel_type === 'array',
      name: rel_name
    })
  )
  return async (data) => {
    debug('pullModifier: in', collection.name, { ...data })
    data.label = documentLabel(data, collection) || ''
    data = addComputedFieldsFromLoadedData(data, collection)
    // * Flatten relationship data so it fits in the `population` system
    for (const { name, multiple } of cleansedRelationships) {
      if (multiple) {
        // * Array relationships: set remote id columns as an array
        // TODO won't work with composite primary keys
        data[name] = (data[name] as []).map((item) => Object.values(item)[0])
      } else {
        // * Object relationships: move foreign key columns to the property name
        // TODO won't work with composite primary keys
        if (data[name]) data[name] = Object.values(data[name])[0]
      }
    }
    debug('pullModifier: out', collection.name, { ...data })
    return data
  }
}

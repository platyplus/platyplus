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
  ADMIN_ROLE,
  getCollectionMetadata,
  getMetadataTable
} from '../../metadata'

import {
  addComputedFieldsFromLoadedData,
  documentLabel
} from '../computed-fields'
import { filteredRelationships, isManyToManyJoinTable } from '../relationships'
import { composeId, getIds } from '../ids'

export const pullQueryBuilder = (
  collection: ContentsCollection,
  batchSize: number
): RxGraphQLReplicationQueryBuilder => {
  const table = getCollectionMetadata(collection)
  const title = metadataName(table)
  const idKeys = getIds(table)
  // * Get the list of array relationship names
  const arrayRelationships = table.relationships.filter(
    ({ type }) => type === 'array'
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
    collection.role === ADMIN_ROLE
      ? table.columns
      : table.columns.filter((column) => column.canSelect.length)
  )
    // * Filter out columns referencing other tables
    .filter((column) => !foreignKeyColumns.includes(column.name))

  const objectRelationshipFields = filteredRelationships(table)
    .filter(({ type }) => type === 'object')
    .map(
      (relationship) =>
        ({
          [relationship.name]: reduceArrayValues(
            relationship.mapping,
            ({ remoteColumnName }) => [remoteColumnName, true]
          )
        } as FieldMap)
    )
  // * - keys as per defined in the relationship mapping
  // * - aggregate (last updated_at) so when it changes it will trigger a new pull
  const arrayRelationshipFields = filteredRelationships(table)
    .filter(({ type }) => type === 'array')
    .map(
      (relationship) =>
        ({
          [relationship.name]: getMetadataTable(
            relationship.remoteTableId
          ).primaryKey.columns.reduce(
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
          [`${relationship.name}_aggregate`]: {
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
  const jsonQuery = {
    query: {
      __name: `query${title}`,
      __variables: {
        updatedAt: 'timestamptz',
        ...reduceArrayValues(idColumns, (column) => [
          column.name,
          column.udtName === 'uuid' ? 'uuid' : 'String'
        ]),
        ...reduceArrayValues(arrayRelationships, ({ name }) => [
          `updated_at_${name}`,
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
                      [rel.name]: {
                        updated_at: {
                          _gt: new VariableType(`updated_at_${rel.name}`)
                        }
                      }
                    },
                    ...rel.mapping
                      .filter((mapping) => mapping.column)
                      .map((mapping) => ({
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
  }
  const query = jsonToGraphQLQuery(jsonQuery)
  return (doc) => {
    const res = {
      query,
      variables: arrayRelationships.reduce<Partial<Contents>>(
        // * add the existing updated_at array relationship aggregates if they exist
        (variables, { name }) => {
          variables[`updated_at_${name}`] =
            doc?.[`${name}_aggregate`]?.aggregate?.max?.updated_at ||
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
  const metadata = getCollectionMetadata(collection)
  return async (data) => {
    debug('pullModifier: in', collection.name, { ...data })
    data = addComputedFieldsFromLoadedData(data, collection)
    data.label = documentLabel(data, collection) || ''
    data.id = composeId(metadata, data)
    // * Flatten relationship data so it fits in the `population` system
    for (const { name, type, remoteTableId } of filteredRelationships(
      metadata
    )) {
      const refMetadata = getMetadataTable(remoteTableId)
      if (type === 'array') {
        if (isManyToManyJoinTable(refMetadata)) {
          // * Many to Many relationships
          const fks = refMetadata.foreignKeys.find(
            // TODO
            // ! equals or different???
            (fk) => fk.refId !== metadata.id
          ).columns
          data[name] = (data[name] as []).map((item) =>
            fks.map((key) => item[key]).join('|')
          )
        } else {
          // * One to Many relationships: set remote id columns as an array
          data[name] = (data[name] as []).map((item) =>
            composeId(refMetadata, item)
          )
        }
      } else {
        // * Object relationships: move foreign key columns to the property name
        if (data[name]) {
          data[name] = composeId(refMetadata, data[name])
        }
      }
    }
    debug('pullModifier: out', collection.name, { ...data })
    return data
  }
}

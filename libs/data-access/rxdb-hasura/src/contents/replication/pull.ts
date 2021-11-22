import deepmerge from 'deepmerge'
import { RxGraphQLReplicationQueryBuilder } from 'rxdb'
import {
  jsonToGraphQLQuery,
  VariableType,
  EnumType
} from 'json-to-graphql-query'

import { reduceArrayValues, reduceStringArrayValues } from '@platyplus/data'
import { debug } from '@platyplus/logger'

import {
  Contents,
  ContentsCollection,
  ContentsDocument,
  Modifier
} from '../../types'
import { FieldMap, collectionName } from '../../utils'
import { getCollectionTableInfo, tableName } from '../../metadata'
import { ADMIN_ROLE } from '../../constants'

import {
  addComputedFieldsFromLoadedData,
  documentLabel
} from '../computed-fields'
import {
  filteredArrayRelationships,
  filteredObjectRelationships,
  filteredRelationships,
  getMirrorRelationship,
  isManyToManyJoinTable,
  isManyToManyRelationship,
  relationshipMapping,
  relationshipTable
} from '../relationships'
import { composeId, getIds } from '../ids'
import { LABEL_COLUMN } from '../columns'

export const pullQueryBuilder = (
  collection: ContentsCollection,
  batchSize: number
): RxGraphQLReplicationQueryBuilder => {
  const table = getCollectionTableInfo(collection)
  const title = tableName(table)
  const idKeys = getIds(table)
  // * Get the list of array relationship names
  const arrayRelationships = filteredArrayRelationships(table)
  const manyToManyRelationships = filteredArrayRelationships(table).filter(
    (rel) => isManyToManyRelationship(table, rel)
  )
  // * List columns referencing other tables, except its own primary key
  const foreignKeyColumns = filteredRelationships(table).reduce<string[]>(
    (aggr, curr) => {
      const cols = Object.keys(relationshipMapping(table, curr))
      aggr.push(
        ...cols.reduce<string[]>((mAggr, mCurr) => {
          if (!idKeys.includes(mCurr)) mAggr.push(mCurr)
          return mAggr
        }, [])
      )
      return aggr
    },
    []
  )

  const columnPermissions =
    table.metadata.select_permissions?.find(
      (p) => p.role === collection.options.role
    )?.permission.columns || []
  const columns = (
    collection.options.role === ADMIN_ROLE
      ? table.columns
      : table.columns.filter((col) => columnPermissions.includes(col.name))
  )
    // * Filter out columns referencing other tables
    .filter((column) => !foreignKeyColumns.includes(column.name))

  const objectRelationshipFields = filteredObjectRelationships(table).map(
    (relationship) =>
      ({
        [relationship.name]: Object.values(
          relationshipMapping(table, relationship)
        ).reduce((agg, curr) => {
          agg[curr] = true
          return agg
        }, {})
      } as FieldMap)
  )

  const arrayRelationshipFields = arrayRelationships.map((relationship) => {
    const res: Record<string, unknown> = {
      [relationship.name]: relationshipTable(
        table,
        relationship
      ).primaryKey.columns.reduce(
        (acc, column) => {
          acc[column] = true
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
      )
    }
    if (isManyToManyRelationship(table, relationship)) {
      res[`${relationship.name}_aggregate`] = {
        aggregate: { max: { updated_at: true } }
      }
    }
    return res
  }) as FieldMap[]

  const fieldsObject = deepmerge.all<FieldMap>([
    // * Column fields
    reduceArrayValues(columns, ({ name }) => [name, true]),
    // * Add fields required for array relationships
    ...arrayRelationshipFields,
    // * Add fields required for object relationships
    ...objectRelationshipFields
    // * Add fields required for computed properties
    // TODO computedProperties
    // ...table.computedProperties
    //   .filter((prop) => prop.transformation)
    //   .map((prop) => rxdbJsonataPaths(prop.transformation, collection))
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
        ...reduceArrayValues(manyToManyRelationships, ({ name }) => [
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
              ...manyToManyRelationships.map(
                (rel) => ({
                  _and: [
                    {
                      [rel.name]: {
                        updated_at: {
                          _gt: new VariableType(`updated_at_${rel.name}`)
                        }
                      }
                    },
                    ...Object.keys(relationshipMapping(table, rel)).map(
                      (col) => ({
                        [col]: {
                          _eq: new VariableType(col)
                        }
                      })
                    )
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
      variables: manyToManyRelationships.reduce<Partial<Contents>>(
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
  const tableInfo = getCollectionTableInfo(collection)
  return async (data) => {
    debug(collection.name, `pullModifier: in`, { ...data })
    data = addComputedFieldsFromLoadedData(data, collection)
    data[LABEL_COLUMN] = (await documentLabel(data, collection)) || ''
    data.id = composeId(tableInfo, data)
    const oldDoc = await collection.findOne(data.id).exec()
    // * Flatten relationship data so it fits in the `population` system
    for (const rel of filteredArrayRelationships(tableInfo)) {
      const refTable = relationshipTable(tableInfo, rel)
      if (isManyToManyJoinTable(refTable)) {
        // * Many to Many relationships
        const fks = refTable.foreignKeys.find(
          // TODO
          // ! equals or different???
          (fk) => fk.to !== tableInfo.id
        ).mapping
        data[rel.name] = (data[rel.name] as []).map((item) =>
          Object.keys(fks)
            .map((key) => item[key])
            .join('|')
        )
      } else {
        // * One to Many relationships: set remote id columns as an array

        data[rel.name] = (data[rel.name] as []).map((item) =>
          composeId(refTable, item)
        )
      }
    }

    for (const rel of filteredObjectRelationships(tableInfo)) {
      const [refTable, refRel] = getMirrorRelationship(tableInfo, rel)
      // * Object relationships: move foreign key columns to the property name
      if (data[rel.name]) {
        const refId = composeId(refTable, data[rel.name])
        data[rel.name] = refId
      }

      if (!isManyToManyRelationship(refTable, refRel)) {
        // * Update mirror one-to-many relationship
        const refCollectionName = collectionName(
          refTable,
          collection.options.role
        )
        const refCollection = collection.database.collections[refCollectionName]
        const refId: string = data[rel.name]
        const oldRefId: string = oldDoc?.get(rel.name)
        // * remove previous value from the mirror one-to-many relationship
        if (refRel && oldRefId && oldRefId !== refId) {
          const oldRefDoc: ContentsDocument = await refCollection
            ?.findOne(oldRefId)
            .exec()
          if (oldRefDoc) {
            const mirrorRel: string[] = oldRefDoc.get(refRel.name)
            await oldRefDoc.atomicPatch({
              is_local_change: true,
              [refRel.name]: mirrorRel.filter((key) => key !== data.id)
            })
          }
        }
        // * add data item from the mirror one-to-many relationship
        // TODO BUG!!!!!!
        if (refRel && refId) {
          const refDoc: ContentsDocument = await refCollection
            ?.findOne(refId)
            .exec()
          if (refDoc) {
            const mirrorRel: string[] = refDoc.get(refRel.name)
            if (mirrorRel && !mirrorRel.includes(data.id)) {
              await refDoc.atomicPatch({
                is_local_change: true,
                [refRel.name]: [...mirrorRel, data.id]
              })
            }
          }
        }
      }
    }

    debug(collection.name, `pullModifier: out`, { ...data })
    return data
  }
}

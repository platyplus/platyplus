import { RxGraphQLReplicationQueryBuilder } from 'rxdb'
import { jsonToGraphQLQuery, EnumType } from 'json-to-graphql-query'

import { debug } from '../../console'
import { Contents, ContentsCollection, Modifier } from '../../types'
import { computedFields } from '../computed-fields'
import {
  filteredRelationships,
  getIds,
  isManyToManyTable,
  metadataName
} from '../schema'
import { reduceStringArrayValues } from '@platyplus/data'

// * Not ideal as it means 'updated_at' column should NEVER be created in the frontend
const isNewDocument = (doc: Contents): boolean => !doc.updated_at

export const pushQueryBuilder = (
  collection: ContentsCollection
): RxGraphQLReplicationQueryBuilder => {
  const table = collection.metadata
  const title = metadataName(table)
  const idKeys = getIds(table)

  const manyToManyRelationships = filteredRelationships(table).filter(
    (rel) => rel.rel_type === 'array' && isManyToManyTable(rel.remoteTable)
  )
  // TODO add many2many mutations
  /*
        1. soft delete old keys:
        update where id is doc.id (set deleted=true)
        2. add new keys
        insert objects{newIds} on_conflict update delete=false
        */

  return ({ _isNew, ...doc }: Contents) => {
    debug('push query builder in', doc)
    // * Process 'system' RxDB fields
    doc.deleted = doc._deleted
    Object.keys(doc)
      .filter((key) => key.startsWith('_'))
      .forEach((key) => delete doc[key])

    const many2ManyValues: Record<string, string[]> = {}
    for (const { rel_name } of manyToManyRelationships) {
      many2ManyValues[rel_name] = doc[rel_name]
      delete doc[rel_name]
      delete doc[`${rel_name}_aggregate`]
    }

    const { id, ...updateDoc } = doc
    const query = jsonToGraphQLQuery({
      mutation: {
        ...manyToManyRelationships.reduce((acc, rel) => {
          // TODO relations with composite ids
          const mapping = rel.mapping[0]
          const joinTable = metadataName(rel.remoteTable)
          const reverseId = rel.remoteTable.primaryKey.columns.find(
            (col) => col.column_name !== mapping.remote_column_name
          ).column_name
          acc[`update_${joinTable}`] = {
            __args: {
              where: {
                [mapping.remote_column_name]: {
                  _eq: doc.id
                }
              },
              _set: {
                deleted: true
              }
            },

            affected_rows: true
          }
          if (many2ManyValues[rel.rel_name]?.length) {
            acc[`insert_${joinTable}`] = {
              __args: {
                objects: many2ManyValues[rel.rel_name].map((id: string) => ({
                  [reverseId]: id,
                  [mapping.remote_column_name]: doc.id,
                  deleted: false
                })),
                on_conflict: {
                  constraint: new EnumType(
                    rel.remoteTable.primaryKey.constraint_name
                  ),
                  update_columns: [new EnumType('deleted')],
                  where: { deleted: { _eq: true } }
                }
              },
              affected_rows: true
            }
          }
          return acc
        }, {}),
        ...(_isNew
          ? {
              [`insert_${title}_one`]: {
                __args: { object: doc },
                ...reduceStringArrayValues(idKeys, () => true)
              }
            }
          : {
              [`update_${title}`]: {
                __args: {
                  where: {
                    id: {
                      _eq: id
                    }
                  },
                  _set: updateDoc
                },
                returning: reduceStringArrayValues(idKeys, () => true)
              }
            })
      }
    })
    debug('push query builder:', { query })
    return {
      query,
      variables: {}
    }
  }
}

export const pushModifier = (collection: ContentsCollection): Modifier => {
  const table = collection.metadata
  // * Don't push changes on views
  if (table.view) return () => null

  const excludeFields = [
    ...computedFields(collection),
    ...table.relationships
      .filter(
        (rel) => rel.rel_type === 'array' && !isManyToManyTable(rel.remoteTable)
      )
      .reduce<string[]>((aggr, { rel_name }) => {
        aggr.push(rel_name, `${rel_name}_aggregate`)
        return aggr
      }, [])
  ]

  const forbiddenInsertColumns =
    collection.role === 'admin'
      ? []
      : table.columns
          .filter((column) => !column.canInsert.length)
          .map((column) => column.column_name)

  const forbiddenUpdateColumns =
    collection.role === 'admin'
      ? []
      : table.columns
          .filter((column) => !column.canUpdate.length)
          .map((column) => column.column_name)

  const relationships = filteredRelationships(table)
  const objectRelationships = relationships.filter(
    ({ rel_type }) => rel_type === 'object'
  )
  // const manyToManyRelationships = relationships.filter(
  //   (rel) => rel.rel_type === 'array' && isManyToManyTable(rel.remoteTable)
  // )

  return async (data) => {
    debug('pushModifier: in:', data)
    const _isNew = isNewDocument(data)
    const id = data.id // * Keep the id to avoid removing it as it is supposed to be part of the columns to exclude from updates

    // * Object relationships:move back property name to the right foreign key column
    for (const { rel_name, mapping } of objectRelationships) {
      if (data[rel_name] !== undefined) {
        data[mapping[0].column?.column_name] = data[rel_name]
        delete data[rel_name]
      }
    }

    // TODO many2many relationships
    //     for (const rel of manyToManyRelationships) {
    //   if (data[rel.rel_name] !== undefined) {
    //     data[rel.rel_name] = []

    //   }
    // }

    // * Exclude 'always' excludable fields e.g. array many2one relationships and not permitted columns
    const excluded = [
      ...excludeFields,
      ...(isNewDocument(data) ? forbiddenInsertColumns : forbiddenUpdateColumns)
    ]
    for (const field of excluded) delete data[field]

    debug('pushModifier: out', { ...data })
    return { _isNew, ...data, id }
  }
}

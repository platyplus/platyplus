import { clone, RxGraphQLReplicationQueryBuilder } from 'rxdb'
import { jsonToGraphQLQuery, EnumType } from 'json-to-graphql-query'

import { reduceStringArrayValues } from '@platyplus/data'

import { Contents, ContentsCollection, Modifier } from '../../types'
import { debug } from '../../console'
import { metadataName } from '../../utils'
import {
  ADMIN_ROLE,
  getCollectionMetadata,
  getMetadataTable
} from '../../metadata'

import { computedFields } from '../computed-fields'
import { decomposeId, getIds } from '../ids'
import { filteredRelationships, isManyToManyJoinTable } from '../relationships'
import { isRequiredRelationship } from '../required'

// * Not ideal as it means 'updated_at' column should NEVER be created in the frontend
const isNewDocument = (doc: Contents): boolean => !doc.updated_at

export const pushQueryBuilder = (
  collection: ContentsCollection
): RxGraphQLReplicationQueryBuilder => {
  const table = getCollectionMetadata(collection)
  const title = metadataName(table)
  const idKeys = getIds(table)

  const arrayRelationships = filteredRelationships(table).filter(
    ({ type }) => type === 'array'
  )

  return ({ _isNew, ...initialDoc }: Contents) => {
    debug('push query builder in', initialDoc)
    const doc = clone(initialDoc)

    Object.keys(doc)
      .filter((key) => key.startsWith('_'))
      .forEach((key) => delete doc[key])

    const arrayValues: Record<string, string[]> = {}
    for (const { name } of arrayRelationships) {
      arrayValues[name] = doc[name]
      delete doc[name]
      delete doc[`${name}_aggregate`]
    }

    const { id, ...updateDoc } = doc
    const jsonQuery = {
      mutation: {
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
            }),
        ...arrayRelationships.reduce((acc, rel) => {
          const remoteTable = getMetadataTable(rel.remoteTableId)
          const isManyToMany = isManyToManyJoinTable(remoteTable)
          const remoteTableName = metadataName(remoteTable)
          if (isManyToMany) {
            // * Many to Many: flag join table items as null
            // TODO improve performance: instead of flagging them all as deleted then upserting the new ones, update only the deleted ones
            acc[`update_${remoteTableName}`] = {
              __args: {
                where: {
                  _and: [
                    ...rel.mapping.map((mapping) => ({
                      [mapping.remoteColumnName]: {
                        _eq: doc[mapping.column.name]
                      }
                    })),
                    { deleted: { _eq: false } }
                  ]
                },
                _set: { deleted: true }
              },
              affected_rows: true
            }
          } else {
            // * One to many: set remote FK to null, only when allowed
            if (!isRequiredRelationship(rel)) {
              // * only if relationship is not required
              // TODO what about DEFAULT value instead of NULL?
              acc[`update_${remoteTableName}`] = {
                __args: {
                  where: {
                    _and: rel.mapping.map((mapping) => ({
                      [mapping.remoteColumnName]: {
                        _eq: doc[mapping.column.name]
                      }
                    }))
                  },
                  _set: rel.mapping.reduce((acc, mapping) => {
                    acc[mapping.remoteColumnName] = null
                    return acc
                  }, {})
                },
                affected_rows: true
              }
            }
          }

          if (arrayValues[rel.name]?.length) {
            if (isManyToMany) {
              acc[`insert_${remoteTableName}`] = {
                __args: {
                  objects: arrayValues[rel.name].map((value) => {
                    return remoteTable.foreignKeys.reduce(
                      (acc, fk) => {
                        fk.columns.forEach((col) => {
                          // TODO composite keys
                          acc[col] = fk.refId === table.id ? doc.id : value
                        })
                        return acc
                      },
                      { deleted: false }
                    )
                  }),
                  on_conflict: {
                    constraint: new EnumType(
                      remoteTable.primaryKey.constraintName
                    ),
                    update_columns: [new EnumType('deleted')],
                    where: { deleted: { _eq: true } }
                  }
                },
                affected_rows: true
              }
            } else {
              acc[`insert_${remoteTableName}`] = {
                __args: {
                  objects: arrayValues[rel.name].map((value) => {
                    const ids = decomposeId(table, doc.id)
                    const remotePk = decomposeId(remoteTable, value)
                    return rel.mapping.reduce((acc, mapping) => {
                      acc[mapping.remoteColumnName] = ids[mapping.column.name]
                      return acc
                    }, remotePk)
                  }),
                  on_conflict: {
                    constraint: new EnumType(
                      remoteTable.primaryKey.constraintName
                    ),
                    update_columns: rel.mapping.map(
                      (mapping) => new EnumType(mapping.remoteColumnName)
                    )
                  }
                },
                affected_rows: true
              }
            }
          }
          return acc
        }, {})
      }
    }
    const query = jsonToGraphQLQuery(jsonQuery)
    debug('push query builder:', jsonQuery)
    return {
      query,
      variables: {}
    }
  }
}

export const pushModifier = (collection: ContentsCollection): Modifier => {
  // TODO replicate only what has changed e.g. _changes sent to the query builder
  const table = getCollectionMetadata(collection)
  // * Don't push changes on views
  if (table.view) return () => null

  const relationships = filteredRelationships(table)
  const objectRelationships = relationships.filter(
    ({ type }) => type === 'object'
  )

  return async (data) => {
    debug('pushModifier: in:', data)
    // * Do not push data if it is flaged as a local change
    if (data.is_local_change) return null
    else delete data.is_local_change
    // TODO weird workaround as RxDB does not seem to take deletedFlag into consideration
    if (data['_deleted']) data.deleted = true
    const _isNew = isNewDocument(data)
    const id = data.id // * Keep the id to avoid removing it as it is supposed to be part of the columns to exclude from updates

    // * Object relationships:move back property name to the right foreign key column
    for (const { name, mapping } of objectRelationships) {
      if (data[name] !== undefined) {
        data[mapping[0].column?.name] = data[name]
        delete data[name]
      }
    }

    // * Exclude 'always' excludable fields e.g. array many2one relationships and not permitted columns
    const excluded = computedFields(collection)
    if (collection.role === ADMIN_ROLE) {
      excluded.push(
        ...table.columns
          .filter(
            (column) => !column[_isNew ? 'canInsert' : 'canUpdate'].length
          )
          .map((column) => column.name)
      )
    }
    for (const field of excluded) delete data[field]

    debug('pushModifier: out', { _isNew, ...data, id })
    return { _isNew, ...data, id }
  }
}

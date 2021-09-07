import { clone, RxGraphQLReplicationQueryBuilder } from 'rxdb'
import { jsonToGraphQLQuery, EnumType } from 'json-to-graphql-query'

import { reduceStringArrayValues } from '@platyplus/data'

import { Contents, ContentsCollection, Modifier } from '../../types'
import { debug } from '../../console'
import { tableName } from '../../utils'
import { getCollectionTableInfo } from '../../store'

import { computedFields } from '../computed-fields'
import { decomposeId, getIds } from '../ids'
import {
  filteredArrayRelationships,
  filteredObjectRelationships,
  isManyToManyJoinTable,
  relationshipMapping,
  relationshipTable
} from '../relationships'
import { isRequiredRelationship } from '../required'
import { ADMIN_ROLE } from '../../metadata'
import { DELETED_COLUMN } from '../columns'

// * Not ideal as it means 'updated_at' column should NEVER be created in the frontend
const isNewDocument = (doc: Contents): boolean => !doc.updated_at

export const pushQueryBuilder = (
  collection: ContentsCollection
): RxGraphQLReplicationQueryBuilder => {
  const table = getCollectionTableInfo(collection)
  const title = tableName(table)
  const idKeys = getIds(table)

  const arrayRelationships = filteredArrayRelationships(table)

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
          const remoteTable = relationshipTable(table, rel)
          const isManyToMany = isManyToManyJoinTable(remoteTable)
          const remoteTableName = tableName(remoteTable)
          const mapping = Object.entries(relationshipMapping(table, rel))
          if (isManyToMany) {
            // * Many to Many: flag join table items as null
            // TODO improve performance: instead of flagging them all as deleted then upserting the new ones, update only the deleted ones
            acc[`update_${remoteTableName}`] = {
              __args: {
                where: {
                  _and: [
                    ...Object.entries(relationshipMapping(table, rel)).map(
                      ([local, remote]) => ({
                        [remote]: {
                          _eq: doc[local]
                        }
                      })
                    ),
                    { deleted: { _eq: false } }
                  ]
                },
                _set: { deleted: true }
              },
              affected_rows: true
            }
          } else {
            // * One to many: set remote FK to null, only when allowed
            if (!isRequiredRelationship(table, rel)) {
              // * only if relationship is not required
              // TODO what about DEFAULT value instead of NULL?
              acc[`update_${remoteTableName}`] = {
                __args: {
                  where: {
                    _and: mapping.map(([local, remote]) => ({
                      [remote]: {
                        _eq: doc[local]
                      }
                    }))
                  },
                  _set: mapping.reduce((acc, [, remote]) => {
                    acc[remote] = null
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
                        mapping.forEach(([local]) => {
                          // TODO composite keys
                          acc[local] = fk.to === table.id ? doc.id : value
                        })
                        return acc
                      },
                      { deleted: false }
                    )
                  }),
                  on_conflict: {
                    constraint: new EnumType(remoteTable.primaryKey.constraint),
                    update_columns: [new EnumType(DELETED_COLUMN)],
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
                    return mapping.reduce((acc, [local, remote]) => {
                      acc[remote] = ids[local]
                      return acc
                    }, remotePk)
                  }),
                  on_conflict: {
                    constraint: new EnumType(remoteTable.primaryKey.constraint),
                    update_columns: mapping.map(
                      ([, remote]) => new EnumType(remote)
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

  return async (data) => {
    debug('pushModifier: in:', data)
    const table = await getCollectionTableInfo(collection)
    const objectRelationships = filteredObjectRelationships(table)
    // * Do not push data if it is flaged as a local change
    if (data.is_local_change) return null
    else delete data.is_local_change
    // TODO weird workaround as RxDB does not seem to take deletedFlag into consideration
    if (data['_deleted']) data.deleted = true
    const _isNew = isNewDocument(data)
    const id = data.id // * Keep the id to avoid removing it as it is supposed to be part of the columns to exclude from updates

    // * Object relationships:move back property name to the right foreign key column
    for (const rel of objectRelationships) {
      if (data[rel.name] !== undefined) {
        const mapping = Object.keys(relationshipMapping(table, rel))
        data[mapping[0]] = data[rel.name]
        delete data[rel.name]
      }
    }

    // * Exclude 'always' excludable fields e.g. array many2one relationships and not permitted columns
    const excluded = computedFields(collection)
    // * Exclude columns that are not present in the role's permissions (or any role's permission when admin)
    const permissions = table.metadata[
      _isNew ? 'insert_permissions' : 'update_permissions'
    ]?.find((p) => p.role === collection.options.role)?.permission
    excluded.push(
      ...table.columns
        .filter((column) => {
          if (collection.options.role === ADMIN_ROLE) {
            return false
          } else {
            if (!permissions) return true
            else return !permissions.columns.includes(column.name)
          }
        })
        .map((column) => column.name)
    )
    // }
    for (const field of excluded) delete data[field]

    debug('pushModifier: out', { _isNew, ...data, id })
    return { _isNew, ...data, id }
  }
}

import { clone, RxGraphQLReplicationQueryBuilder } from 'rxdb'
import { jsonToGraphQLQuery, EnumType } from 'json-to-graphql-query'

import { reduceStringArrayValues } from '@platyplus/data'

import { Contents, ContentsCollection, Modifier } from '../../types'
import { debug, info } from '../../console'
import { metadataName } from '../../utils'

import { computedFields } from '../computed-fields'
import { getIds } from '../ids'
import { filteredRelationships, isManyToManyTable } from '../relationships'
import {
  isConsoleEnabled,
  isConfigCollection,
  upsertWithMigration
} from '../config'
import { getCollectionMetadata } from '../../metadata'

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
    const query = jsonToGraphQLQuery({
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
          // TODO relations with composite ids
          const isManyToMany = isManyToManyTable(rel.remoteTable)
          const mapping = rel.mapping[0]
          const joinTable = metadataName(rel.remoteTable)
          const reverseId = rel.remoteTable.primaryKey.columns.find(
            (col) => col.columnName !== mapping.remoteColumnName
          ).columnName
          if (isManyToMany) {
            acc[`update_${joinTable}`] = {
              __args: {
                where: {
                  [mapping.remoteColumnName]: {
                    _eq: doc.id
                  }
                },
                _set: { deleted: true }
              },
              affected_rows: true
            }
          }

          if (arrayValues[rel.name]?.length) {
            if (isManyToMany) {
              acc[`insert_${joinTable}`] = {
                __args: {
                  objects: arrayValues[rel.name].map((id: string) => ({
                    [reverseId]: id,
                    [mapping.remoteColumnName]: doc.id,
                    deleted: false
                  })),
                  on_conflict: {
                    constraint: new EnumType(
                      rel.remoteTable.primaryKey.constraintName
                    ),
                    update_columns: [new EnumType('deleted')],
                    where: { deleted: { _eq: true } }
                  }
                },
                affected_rows: true
              }
            } else {
              acc[`insert_${joinTable}`] = {
                __args: {
                  objects: arrayValues[rel.name].map((id: string) => ({
                    [reverseId]: id,
                    [mapping.remoteColumnName]: doc.id
                  })),
                  on_conflict: {
                    constraint: new EnumType(
                      rel.remoteTable.primaryKey.constraintName
                    ),
                    update_columns: [new EnumType(mapping.remoteColumnName)]
                  }
                },
                affected_rows: true
              }
            }
          }
          return acc
        }, {})
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

    if (isConsoleEnabled() && isConfigCollection(collection)) {
      try {
        await upsertWithMigration(table, data)
        return null
      } catch {
        // TODO updated_at is not present, so it mixes up insert and update
        info(
          'Could not save the migration through Hasura Console. Falling back to regular GraphQL replication'
        )
      }
    }

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
    if (collection.role === 'admin') {
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

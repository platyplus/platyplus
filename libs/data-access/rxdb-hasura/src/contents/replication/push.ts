import { RxGraphQLReplicationQueryBuilder } from 'rxdb'
import { jsonToGraphQLQuery } from 'json-to-graphql-query'

import { debug } from '../../console'
import { Contents, ContentsCollection, Modifier } from '../../types'
import { computedFields } from '../computed-fields'
import { filteredRelationships, getIds, metadataName } from '../schema'
import { reduceStringArrayValues } from '@platyplus/data'

// * Not ideal as it means 'updated_at' column should NEVER be created in the frontend
const isNewDocument = (doc: Contents): boolean => !doc.updated_at

export const pushQueryBuilder = (
  collection: ContentsCollection
): RxGraphQLReplicationQueryBuilder => {
  const table = collection.metadata
  const title = metadataName(table)
  const idKeys = getIds(table)

  return ({ _isNew, ...doc }: Contents) => {
    debug('push query builder in', doc)
    // * Process 'system' RxDB fields
    doc.deleted = doc._deleted
    Object.keys(doc)
      .filter((key) => key.startsWith('_'))
      .forEach((key) => delete doc[key])

    const { id, ...updateDoc } = doc

    const query = jsonToGraphQLQuery({
      mutation: _isNew
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
  const objectRelationships = filteredRelationships(table)
    .filter(({ rel_type }) => rel_type === 'object')
    .map((rel) => {
      return {
        name: rel.rel_name,
        column: rel.mapping[0].column?.column_name
      }
    })

  const excludeFields = [
    ...computedFields(collection),
    ...table.relationships
      .filter(({ rel_type }) => rel_type === 'array')
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

  return async (data) => {
    debug('pushModifier: in:', data)
    const _isNew = isNewDocument(data)
    const id = data.id // * Keep the id to avoid removing it as it is supposed to be part of the columns to exclude from updates

    // * Object relationships:move back property name to the right foreign key column
    for (const { name, column } of objectRelationships) {
      if (data[name] !== undefined) {
        data[column] = data[name]
        delete data[name]
      }
    }

    // * Exclude 'always' excludable fields e.g. array relationships and not permitted columns
    const excluded = [
      ...excludeFields,
      ...(isNewDocument(data) ? forbiddenInsertColumns : forbiddenUpdateColumns)
    ]
    for (const field of excluded) delete data[field]

    debug('pushModifier: out', { ...data })
    return { _isNew, ...data, id }
  }
}

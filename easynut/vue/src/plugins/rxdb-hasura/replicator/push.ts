import { RxGraphQLReplicationQueryBuilder } from 'rxdb'
import stringifyObject from 'stringify-object'

import { TableFragment } from '../../../generated'
import { debug, fullTableName } from '../helpers'
import { GenericDocument } from '../types'
import { Modifier } from './types'

// * Not ideal as it means 'updated_at' column should NEVER be created in the frontend
const isNewDocument = (doc: GenericDocument): boolean => !doc.updated_at

export const pushQueryBuilder = (
  table: TableFragment
): RxGraphQLReplicationQueryBuilder => {
  const title = fullTableName(table)
  return ({ _isNew, ...doc }: GenericDocument) => {
    debug('push query builder in', doc)
    // const { _isNew, ...insertDoc } = doc
    const { id, ...updateDoc } = doc
    const query = _isNew
      ? `mutation { insert_${title}_one(object:${stringifyObject(doc, {
          singleQuotes: false
        })}) { id } }`
      : `mutation { update_${title}(where: { id: { _eq: "${id}" } }, _set: ${stringifyObject(
          updateDoc,
          { singleQuotes: false }
        )}) { returning { id } } }`
    debug('push query builder:', { query })
    return {
      query,
      variables: {}
    }
  }
}

export const pushModifier = (table: TableFragment): Modifier => {
  const objectRelationships = table.relationships
    .filter(({ rel_type }) => rel_type === 'object')
    .map(rel => {
      return {
        name: rel.rel_name as string,
        column: rel.mapping[0].column?.column_name as string
      }
    })

  const excludeFields = [
    // TODO soft delete - remove the following value
    'deleted',
    ...table.relationships
      .filter(({ rel_type }) => rel_type === 'array')
      .reduce<string[]>(
        (aggr, { rel_name }) => (
          aggr.push(rel_name as string, `${rel_name}_aggregate`), aggr
        ),
        []
      )
  ]

  const forbiddenInsertColumns = table.columns
    .filter(column => !column.canInsert.length)
    .map(column => column.column_name as string)
  const forbiddenUpdateColumns = table.columns
    .filter(column => !column.canUpdate.length)
    .map(column => column.column_name as string)

  return doc => {
    debug('pushModifier: in:', doc)
    const _isNew = isNewDocument(doc)
    const id = doc.id // * Keep the id to avoid removing it as it is supposed to be part of the columns to exclude from updates

    // * Object relationships:move back property name to the right foreign key column
    for (const { name, column } of objectRelationships) {
      doc[column] = doc[name]
      delete doc[name]
    }

    // * Exclude 'always' excludable fields e.g. array relationships and not permitted columns
    const excluded = [
      ...excludeFields,
      ...(isNewDocument(doc) ? forbiddenInsertColumns : forbiddenUpdateColumns)
    ]
    for (const field of excluded) delete doc[field]

    debug('pushModifier: out', { ...doc })
    return { id, _isNew, ...doc }
  }
}

import { RxGraphQLReplicationQueryBuilder } from 'rxdb'

import { TableFragment } from '../../../generated'
import { debug, fullTableName } from '../helpers'
import { GenericDocument } from '../types'
import { Modifier } from './types'

export const pushQueryBuilder = (
  table: TableFragment
): RxGraphQLReplicationQueryBuilder => {
  const title = fullTableName(table)
  const primaryKey = table.primaryKey?.constraint_name
  const updateColumns = table.columns
    .filter(col => col.canUpdate.length)
    .map(col => col.column_name)
  // TODO only canInsert fields when insert, and canUpdate fields when update
  return (doc: GenericDocument) => {
    debug('push query', doc)
    const query = `mutation upsert${title} ($objects: [${title}_insert_input!]!) {
        insert_${title} (
            objects: $objects,
            on_conflict: {
                constraint: ${primaryKey},
                update_columns: [${updateColumns.join(',')}]
            }){
            returning {
              id
            }
          }
   }`
    const variables = {
      objects: doc
    }
    debug('push query builder:', { query, variables })
    return {
      query,
      variables
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
  // const primaryColumns =
  //   table.primaryKey?.columns.map(col => col.column_name as string) || []
  const arrayRelationships = table.relationships
    .filter(({ rel_type }) => rel_type === 'array')
    .reduce<string[]>(
      (aggr, { rel_name }) => (
        aggr.push(rel_name as string, `${rel_name}_aggregate`), aggr
      ),
      []
    )
  const excludeFields = ['updated_at', ...arrayRelationships]

  // TODO array relationships
  // TODO soft delete - remove the following line?
  excludeFields.push('deleted')

  return doc => {
    debug('pushModifier: in:', { ...doc })
    // * Object relationships:move back property name to the right foreign key column
    for (const { name, column } of objectRelationships) {
      doc[column] = doc[name]
      delete doc[name]
    }
    for (const field of excludeFields) {
      delete doc[field]
    }
    debug('pushModifier: out', { ...doc })
    return doc
  }
}

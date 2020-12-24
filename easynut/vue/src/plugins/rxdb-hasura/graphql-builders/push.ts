import { RxGraphQLReplicationQueryBuilder } from 'rxdb'

import { TableFragment } from '../../../generated'
import { fullTableName } from '../helpers'
import { Modifier } from './types'

export const pushQueryBuilder = (
  table: TableFragment
): RxGraphQLReplicationQueryBuilder => {
  const title = fullTableName(table)
  const primaryKey = table.primaryKey?.constraint_name
  const updateColumns = table.columns
    .filter(col => col.canUpdate.length)
    .map(col => col.column_name)
  return (doc: Record<string, unknown>) => {
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
    return {
      query,
      variables
    }
  }
}

export const pushModifier = (table: TableFragment): Modifier => {
  const oneToManyRelationships = table.relationships
    .filter(rel => rel.rel_type === 'object')
    .map(rel => {
      return {
        name: rel.rel_name as string,
        column: rel.mapping[0].column?.column_name as string
      }
    })
  return doc => {
    // * OneToMany relationships:move back property name to the right foreign key column
    for (const { name, column } of oneToManyRelationships) {
      doc[column] = doc[name]
      delete doc[name]
    }

    // TODO soft delete
    delete doc.deleted
    return doc
  }
}

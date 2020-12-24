import { RxGraphQLReplicationQueryBuilder } from 'rxdb'

import { TableFragment } from '../../../generated'
import { fullTableName } from '../helpers'
import { Modifier } from './types'

export const pullQueryBuilder = (
  table: TableFragment,
  batchSize: number
): RxGraphQLReplicationQueryBuilder => {
  const fields = table.columns
    .filter(column => column.canSelect.length)
    .map(col => col.column_name)
  const title = fullTableName(table)

  // * Add ids of array relationships
  table.relationships
    .filter(rel => rel.rel_type === 'array')
    .map(relationship => {
      const remoteColumns = relationship.mapping.map(
        item => item.column?.column_name
      )
      fields.push(`${relationship.rel_name} { ${remoteColumns.join(' ')} }`)
    })
  return (doc: { updated_at: string }) => {
    if (!doc) {
      doc = {
        updated_at: new Date(0).toUTCString()
      }
    }
    // const includeId = doc.id ? `{ id: {_eq: "${doc.id}"} }` : ''
    const query = `{
            ${title} (
                  where: {
                       _and: [
                        { updated_at: { _gt: "${doc.updated_at}" } }
                       ]
                    },
                  limit: ${batchSize},
                  order_by: [ {updated_at: asc} ]
            ){
                ${fields.join(' ')}

            }
        }`
    return {
      query,
      variables: {}
    }
  }
}

export const pullModifier = (table: TableFragment): Modifier => {
  const cleansedRelationships = table.relationships.map(rel => {
    return {
      multiple: rel.rel_type === 'array',
      name: rel.rel_name as string,
      column: rel.mapping[0].column?.column_name as string,
      remoteColumn: rel.mapping[0].remote_column_name as string
    }
  })

  return doc => {
    for (const {
      name,
      column,
      multiple,
      remoteColumn
    } of cleansedRelationships) {
      if (multiple) {
        // * Array relationships: set remote id columns as an array
        doc[name] = (doc[name] as []).map(item => item[remoteColumn])
      } else {
        // * Object relationships: move foreign key columns to the property name
        doc[name] = doc[column]
        delete doc[column]
      }
    }
    return doc
  }
}

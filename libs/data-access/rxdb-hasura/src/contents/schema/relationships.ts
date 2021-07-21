import { TopLevelProperty } from 'rxdb/dist/types/types'

import { Metadata } from '../../types'
import { getIds } from './id'
import { metadataName } from './name'
import { propertyJsonType } from './property'
export const filteredRelationships = (
  table: Metadata
): Metadata['relationships'] =>
  table.relationships.filter(
    (relationship) => relationship.mapping.length === 1
  )

export const createRelationshipProperties = (
  table: Metadata,
  role: string
): Record<string, TopLevelProperty> => {
  const result: Record<string, TopLevelProperty> = {}
  filteredRelationships(table).forEach((relationship) => {
    const relName = relationship.rel_name
    const mappingItem = relationship.mapping[0]
    const column = mappingItem.column
    const refTable = mappingItem.remoteTable
    const ref = `${role}_${metadataName(refTable)}`

    const type = propertyJsonType(column)
    if (relationship.rel_type === 'object') {
      // * Object relationships
      result[relName] = {
        type: ['string', 'null'], // ? null only if relationship is nullable?
        ref
      }
    } else if (relationship.rel_type === 'array') {
      // * Array relationships
      result[relName] = {
        type: 'array',
        ref,
        items: {
          type
        }
      }
      // * Add the relationship aggregates - it is needed for the replication system
      result[`${relName}_aggregate`] = {
        type: 'object',
        properties: {
          aggregate: {
            type: 'object',
            properties: {
              max: {
                type: 'object',
                properties: { updated_at: { type: ['string', 'null'] } }
              }
            }
          }
        }
      }
    }
  })
  return result
}

// * A table is a ManyToMany transition table when:
// * its only two columns (except updated_at and deleted) compose the primary key, AND
// * they both refer to an object relation
// TODO check each relatio
export const isManyToManyTable = (table: Metadata): boolean => {
  const pkColumns = getIds(table)

  return (
    table.columns.filter(
      (column) =>
        !['updated_at', 'deleted'].includes(column.column_name) &&
        pkColumns.includes(column.column_name)
    ).length === 2 &&
    pkColumns.every((pk) =>
      table.relationships.some(
        (rel) =>
          rel.mapping.some((mapping) => mapping.column.column_name === pk) &&
          rel.rel_type === 'object'
      )
    )
  )
}

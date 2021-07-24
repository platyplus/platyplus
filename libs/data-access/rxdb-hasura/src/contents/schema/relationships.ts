import { TopLevelProperty } from 'rxdb/dist/types/types'
import { RemoteTableFragment } from '../../generated'
import { Metadata } from '../../types'
import { metadataName } from '../../utils'

import { getIds } from './id'
import { propertyJsonType } from './property'

// TODO composite relationships - then remove this
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
    // TODO relationships with composite keys
    const column = relationship.mapping[0].column
    const refTable = isManyToManyTable(relationship.remoteTable)
      ? relationship.remoteTable.relationships.find(
          (rel) => rel.remoteTable.id !== table.id
        ).remoteTable
      : relationship.remoteTable
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
// * they only have two relationships, AND
// * both relationships are of object type
export const isManyToManyTable = (
  table: Metadata | RemoteTableFragment
): boolean => {
  const pkColumns = getIds(table)
  return (
    table.columns.filter(
      (column) =>
        !['updated_at', 'deleted'].includes(column.name) &&
        pkColumns.includes(column.name)
    ).length === 2 &&
    table.relationships.length === 2 &&
    table.relationships.every((rel) => rel.rel_type === 'object')
  )
}

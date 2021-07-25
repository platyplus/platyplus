import { RemoteTableFragment } from '../../generated'
import { Metadata } from '../../types'

import { getIds } from '../schema'

// TODO composite relationships - then remove this
export const filteredRelationships = (
  table: Metadata
): Metadata['relationships'] =>
  table.relationships.filter(
    (relationship) => relationship.mapping.length === 1
  )

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

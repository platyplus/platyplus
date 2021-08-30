import { Metadata } from '../../metadata'
import { getMetadataTable } from '../../store'

import { getIds } from '../ids'

export const filteredRelationships = (
  table: Metadata
): Metadata['relationships'] =>
  table.relationships.filter(
    (relationship) =>
      relationship.remoteTableId &&
      !!getMetadataTable(relationship.remoteTableId)
  )

// * A table is a ManyToMany transition table when it has a composite primary key that refers to two foreign keys
// TODO won't work with manually defined relationships in Hasura i.e. the ones not using foreign keys
export const isManyToManyJoinTable = (table: Metadata): boolean => {
  const pkColumns = getIds(table)
  const nbPrimaryForeignKeys = pkColumns.filter((pk) =>
    table.foreignKeys?.some((fk) => fk.columns.includes(pk))
  ).length
  return nbPrimaryForeignKeys === 2
}

export const shiftedMetadataTable = (
  table: Metadata,
  relationship: Metadata['relationships'][0]
) => {
  const refTable = getMetadataTable(relationship.remoteTableId)
  if (isManyToManyJoinTable(refTable))
    return getMetadataTable(
      refTable.relationships.find((rel) => rel.remoteTableId !== table.id)
        .remoteTableId
    )
  else return refTable
}

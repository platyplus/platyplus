import { getTableInfo, Relationship, TableInformation } from '../../metadata'

import { getIds } from '../ids'

export const findRelationship = (table: TableInformation, name: string) =>
  allRelationships(table).find((rel) => rel.name === name)

export const allRelationships = (table: TableInformation) => [
  ...(table.metadata.array_relationships?.map((rel) => ({
    ...rel,
    type: 'array'
  })) || []),
  ...(table.metadata.object_relationships?.map((rel) => ({
    ...rel,
    type: 'object'
  })) || [])
]

export const filteredRelationships = (table: TableInformation) =>
  allRelationships(table).filter((rel) => !!relationshipTable(table, rel))

export const filteredObjectRelationships = (
  table: TableInformation
): Array<Relationship> =>
  table.metadata.object_relationships?.filter(
    (rel) => !!relationshipTable(table, rel)
  ) || []

export const filteredArrayRelationships = (
  table: TableInformation
): Array<Relationship> =>
  table.metadata.array_relationships?.filter(
    (rel) => !!relationshipTable(table, rel)
  ) || []

// * A table is a ManyToMany transition table when it has a composite primary key that refers to two foreign keys
// TODO won't work with manually defined relationships in Hasura i.e. the ones not using foreign keys
export const isManyToManyJoinTable = (table: TableInformation): boolean => {
  const pkColumns = getIds(table)
  const nbPrimaryForeignKeys = pkColumns.filter((pk) =>
    table.foreignKeys?.some((fk) => Object.keys(fk.mapping).includes(pk))
  ).length
  return nbPrimaryForeignKeys === 2
}

export const shiftedTable = (
  table: TableInformation,
  relationship: Relationship
) => {
  const refTable = relationshipTable(table, relationship)
  // * Return null if no correspondig remote table is found in the store
  if (!refTable) return null
  else if (isManyToManyJoinTable(refTable))
    return getTableInfo(
      allRelationships(refTable)
        .map((rel) => relationshipTableId(refTable, rel))
        .find((relId) => relId !== table.id)
    )
  else return refTable
}

export const relationshipMapping = (
  table: TableInformation,
  rel: Relationship
): Record<string, string> => {
  return rel.using.foreign_key_constraint_on
    ? table.foreignKeys.find((key) =>
        Object.keys(key.mapping).includes(rel.using.foreign_key_constraint_on)
      )?.mapping
    : rel.using.manual_configuration.column_mapping
}

export const relationshipTableId = (
  table: TableInformation,
  relationship: Relationship
): string | undefined => {
  if (relationship) {
    const {
      using: { foreign_key_constraint_on, manual_configuration }
    } = relationship
    return foreign_key_constraint_on
      ? table.foreignKeys.find((key) =>
          Object.keys(key.mapping).includes(foreign_key_constraint_on)
        ).to
      : `${manual_configuration.remote_table.schema}.${manual_configuration.remote_table.name}`
  }
}

export const relationshipTable = (table: TableInformation, rel: Relationship) =>
  getTableInfo(relationshipTableId(table, rel))

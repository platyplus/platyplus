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
// TODO check again - probaly buggy
export const isManyToManyJoinTable = (table: TableInformation): boolean => {
  if (!table) return false
  const pkColumns = getIds(table)
  const nbPrimaryForeignKeys = pkColumns.filter((pk) =>
    table.foreignKeys?.some((fk) => Object.keys(fk.mapping).includes(pk))
  ).length
  return nbPrimaryForeignKeys === 2
}

export const isManyToManyRelationship = (
  table: TableInformation,
  rel: Relationship
): boolean => {
  const remoteTable = relationshipTable(table, rel)
  return isManyToManyJoinTable(remoteTable)
}

export const shiftedTable = (
  table: TableInformation,
  relationship: Relationship
) => {
  const refTable = relationshipTable(table, relationship)
  // * Return null if no correspondig remote table is found in the store
  if (!refTable) return null
  else if (isManyToManyJoinTable(refTable)) {
    return getTableInfo(
      allRelationships(refTable)
        .map((rel) => relationshipTableId(refTable, rel))
        .find((relId) => relId !== table.id)
    )
  } else return refTable
}

export const relationshipMapping = (
  table: TableInformation,
  { using: { foreign_key_constraint_on, manual_configuration } }: Relationship
): Record<string, string> => {
  if (foreign_key_constraint_on) {
    if (typeof foreign_key_constraint_on === 'string') {
      const fk = foreign_key_constraint_on
      return table.foreignKeys.find((key) =>
        Object.keys(key.mapping).includes(fk)
      )?.mapping
    } else {
      const fk = foreign_key_constraint_on.column
      const tableId = `${foreign_key_constraint_on.table.schema}.${foreign_key_constraint_on.table.name}`
      const remoteTable = getTableInfo(tableId)
      const mapping = remoteTable.foreignKeys.find(
        (key) => key.to === table.id && Object.keys(key.mapping).includes(fk)
      )?.mapping
      // Revert mapping
      return Object.entries(mapping).reduce((agg, [key, value]) => {
        agg[value] = key
        return agg
      }, {})
    }
  } else {
    return manual_configuration.column_mapping
  }
}

export const relationshipTableId = (
  table: TableInformation,
  relationship: Relationship
): string | undefined => {
  if (relationship) {
    const {
      using: { foreign_key_constraint_on, manual_configuration }
    } = relationship
    if (foreign_key_constraint_on) {
      if (typeof foreign_key_constraint_on === 'string') {
        return table.foreignKeys.find((key) =>
          Object.keys(key.mapping).includes(foreign_key_constraint_on)
        )?.to
      } else {
        return `${foreign_key_constraint_on.table.schema}.${foreign_key_constraint_on.table.name}`
      }
    } else
      return `${manual_configuration.remote_table.schema}.${manual_configuration.remote_table.name}`
  }
}

export const relationshipTable = (table: TableInformation, rel: Relationship) =>
  getTableInfo(relationshipTableId(table, rel))

export const getMirrorRelationship = (
  tableInfo: TableInformation,
  rel: Relationship
): [TableInformation, Relationship] => {
  const refTable = shiftedTable(tableInfo, rel)
  if (rel.using.manual_configuration) {
    // TODO profile
    console.error(`not implemented`)
    return [null, null]
  }
  const fromKey =
    typeof rel.using.foreign_key_constraint_on === 'string'
      ? rel.using.foreign_key_constraint_on
      : rel.using.foreign_key_constraint_on.column

  const refRel = allRelationships(refTable).find(
    ({ using: { foreign_key_constraint_on, manual_configuration }, name }) => {
      if (foreign_key_constraint_on) {
        if (typeof foreign_key_constraint_on === 'string') {
          return fromKey === foreign_key_constraint_on
        } else return fromKey === foreign_key_constraint_on.column
      } else {
        console.warn('not implemented yet - manual_configuration')
        return false
      }
    }
  )
  return [refTable, refRel]
}

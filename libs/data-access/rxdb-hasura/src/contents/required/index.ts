import { Column, Relationship, TableInformation } from '../../metadata'
import { getColumn } from '../columns'

import { columnHasDefaultValue } from '../defaults'
import { isIdColumn } from '../ids'
import { propertyNames } from '../properties'
import { relationshipMapping } from '../relationships'

export const isRequiredColumn = (table: TableInformation, column: Column) =>
  (!isNullableColumn(column) && !columnHasDefaultValue(column)) ||
  isIdColumn(table, column)

export const isRequiredRelationship = (
  table: TableInformation,
  rel: Relationship
) =>
  Object.keys(relationshipMapping(table, rel)).some((colName) => {
    const column = getColumn(table, colName)
    return isRequiredColumn(table, column)
  })

export const isRequiredProperty = (
  table: TableInformation,
  propertyName: string
): boolean => {
  // * Property is required when column is not nullable
  const column = table.columns.find(({ name }) => name === propertyName)
  if (column) return isRequiredColumn(table, column)

  const relation = table.metadata.object_relationships?.find(
    ({ name }) => name === propertyName
  )
  if (relation) return isRequiredRelationship(table, relation)

  return undefined
}

export const isNullableColumn = (columnInfo: Column) => columnInfo.nullable

export const requiredProperties = (table: TableInformation): string[] =>
  propertyNames(table).filter((name) => isRequiredProperty(table, name))

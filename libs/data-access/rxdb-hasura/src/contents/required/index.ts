import { Column, Relationship, TableInfo } from '../../metadata'

import { columnHasDefaultValue } from '../defaults'
import { isIdColumn } from '../ids'
import { propertyNames } from '../properties'
import { relationshipMapping } from '../relationships'

export const isRequiredColumn = (table: Partial<TableInfo>, column: Column) =>
  (!isNullableColumn(column) && !columnHasDefaultValue(column)) ||
  isIdColumn(table, column)

export const isRequiredRelationship = (
  table: Partial<TableInfo>,
  rel: Relationship
) =>
  Object.keys(relationshipMapping(table, rel)).some((colName) => {
    const column = table.columns.find((c) => c.name === colName)
    return isRequiredColumn(table, column)
  })

export const isRequiredProperty = (
  table: Partial<TableInfo>,
  propertyName: string
): boolean => {
  // * Property is required when column is not nullable
  const column = table.columns.find(({ name }) => name === propertyName)
  if (column) return isRequiredColumn(table, column)

  const relation = table.metadata.object_relationships.find(
    ({ name }) => name === propertyName
  )
  if (relation) return isRequiredRelationship(table, relation)

  return undefined
}

// TODO change isNullable to boolean value in SQL view definition
export const isNullableColumn = (columnInfo: Column) => !columnInfo.nullable

export const requiredProperties = (table: Partial<TableInfo>): string[] =>
  propertyNames(table).filter((name) => isRequiredProperty(table, name))

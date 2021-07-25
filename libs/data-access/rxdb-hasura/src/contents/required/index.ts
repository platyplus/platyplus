import { ColumnFragment, Metadata } from '../../types'
import { columnHasDefaultValue } from '../defaults'
import { propertyNames } from '../properties'

export const isRequiredColumn = (column: ColumnFragment) =>
  !isNullableColumn(column) && !columnHasDefaultValue(column)

export const isRequiredRelationship = (rel: Metadata['relationships'][0]) =>
  rel.rel_type === 'object' &&
  rel.mapping.some((mapping) => isRequiredColumn(mapping.column))

export const isRequiredProperty = (table: Metadata, name: string): boolean => {
  // * Property is required when column is not nullable
  const column = table.columns.find((col) => col.name === name)
  if (column) return isRequiredColumn(column)

  const relation = table.relationships.find((rel) => rel.rel_name === name)
  if (relation) return isRequiredRelationship(relation)

  return undefined
}

// TODO change isNullable to boolean value in SQL view definition
export const isNullableColumn = (columnInfo: ColumnFragment) =>
  columnInfo.isNullable !== 'NO'

export const requiredProperties = (table: Metadata): string[] =>
  propertyNames(table).filter((name) => isRequiredProperty(table, name))

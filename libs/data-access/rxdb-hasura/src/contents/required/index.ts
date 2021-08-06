import { CommonColumnFragment } from '../../generated'
import { Metadata } from '../../metadata'

import { columnHasDefaultValue } from '../defaults'
import { propertyNames } from '../properties'

export const isRequiredColumn = (column: CommonColumnFragment) =>
  !isNullableColumn(column) && !columnHasDefaultValue(column)

export const isRequiredRelationship = (rel: Metadata['relationships'][0]) =>
  rel.type === 'object' &&
  rel.mapping.some((mapping) => isRequiredColumn(mapping.column))

export const isRequiredProperty = (
  table: Metadata,
  propertyName: string
): boolean => {
  // * Property is required when column is not nullable
  const column = table.columns.find(({ name }) => name === propertyName)
  if (column) return isRequiredColumn(column)

  const relation = table.relationships.find(({ name }) => name === propertyName)
  if (relation) return isRequiredRelationship(relation)

  return undefined
}

// TODO change isNullable to boolean value in SQL view definition
export const isNullableColumn = (columnInfo: CommonColumnFragment) =>
  columnInfo.isNullable !== 'NO'

export const isNullableRelationship = (rel: Metadata['relationships'][0]) =>
  rel.type === 'object' &&
  rel.mapping.every((mapping) => isNullableColumn(mapping.column))

export const requiredProperties = (table: Metadata): string[] =>
  propertyNames(table).filter((name) => isRequiredProperty(table, name))

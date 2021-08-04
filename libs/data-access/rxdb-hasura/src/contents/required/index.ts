import { getMetadataTable, Metadata } from '../../metadata'
import { ColumnFragment } from '../../types'
import { columnHasDefaultValue } from '../defaults'
import { propertyNames } from '../properties'

export const isRequiredColumn = (column: ColumnFragment) =>
  !isNullableColumn(column) && !columnHasDefaultValue(column)

export const isRequiredRelationship = (rel: Metadata['relationships'][0]) =>
  rel.type === 'object' &&
  rel.mapping.some((mapping) => isRequiredColumn(mapping.column))

/**
 * Checks if items can be removed from an array relationship
 * @param metadata
 * @param propertyName
 * @returns
 */
export const canRemoveCollectionItem = (
  metadata: Metadata,
  propertyName: string
) => {
  const prop = metadata.properties.get(propertyName)
  if (prop && prop.type === 'collection') {
    const remoteMetadata = getMetadataTable(prop.relationship.remoteTableId)
    const remoteColumns = prop.relationship.mapping.map(
      (mapping) => mapping.remoteColumnName
    )
    return remoteMetadata.columns
      .filter((col) => remoteColumns.includes(col.name))
      .every((col) => !isRequiredColumn(col))
  } else {
    console.warn(
      'canRemoveItem: property not found or incorrect type (non "collection")',
      metadata,
      propertyName
    )
    return false
  }
}
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
export const isNullableColumn = (columnInfo: ColumnFragment) =>
  columnInfo.isNullable !== 'NO'

export const isNullableRelationship = (rel: Metadata['relationships'][0]) =>
  rel.type === 'object' &&
  rel.mapping.every((mapping) => isNullableColumn(mapping.column))

export const requiredProperties = (table: Metadata): string[] =>
  propertyNames(table).filter((name) => isRequiredProperty(table, name))

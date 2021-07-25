import { ColumnFragment, ContentsDocument, Metadata } from '../../types'
import { columnProperties } from './columns'

export const isRequiredProperty = (
  document: ContentsDocument,
  name: string
): boolean => requiredProperties(document.collection.metadata).includes(name)

// TODO change isNullable to boolean value in SQL view definition
export const isNullableColumn = (columnInfo: ColumnFragment) =>
  columnInfo.isNullable !== 'NO'

export const requiredProperties = (table: Metadata): string[] => {
  // * Column is required when column is not nullable
  const requiredColumns = columnProperties(table)
    .filter((column) => !isNullableColumn(column))
    .map((column) => column.name)
  // * OBJECT relationship is required when its foreign key is not nullable
  const requiredRelationships = table.relationships
    .filter(
      (rel) =>
        rel.rel_type === 'object' &&
        rel.mapping.some((mapping) => !isNullableColumn(mapping.column))
    )
    .map((rel) => rel.rel_name)
  return [...requiredColumns, ...requiredRelationships]
}

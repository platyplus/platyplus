import { ColumnFragment, ContentsDocument, Metadata } from '../../types'

export const isRequiredProperty = (
  document: ContentsDocument,
  name: string
): boolean => {
  // TODO make it work for relationships
  return document.collection.schema.jsonSchema.required.includes(name)
}

// TODO change isNullable to boolean value in SQL view definition
export const isNullableColumn = (columnInfo: ColumnFragment) =>
  columnInfo.isNullable === 'YES'

export const requiredProperties = (table: Metadata): string[] =>
  // * Property is required when column is not nullable
  table.columns
    .filter(
      (column) =>
        !['updated_at', 'deleted'].includes(column.name) &&
        !isNullableColumn(column)
    )
    .map((column) => column.name)

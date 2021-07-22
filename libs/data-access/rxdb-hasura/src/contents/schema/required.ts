import { Metadata } from '../../types'

export const requiredProperties = (table: Metadata): string[] =>
  // * Property is required when column is not nullable
  table.columns
    .filter(
      (column) =>
        !['updated_at', 'deleted'].includes(column.name) &&
        column.isNullable === 'NO'
    )
    .map((column) => column.name)

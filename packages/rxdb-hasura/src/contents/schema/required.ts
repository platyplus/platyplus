import { Metadata } from '../../types'

export const requiredProperties = (table: Metadata): string[] => {
  // * Property is required when column is not nullable
  return table.columns
    .filter(column => !column.is_nullable)
    .map(column => column.column_name as string)
}

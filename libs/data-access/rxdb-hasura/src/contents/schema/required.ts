import { warn } from '../../console'
import { Metadata } from '../../types'

export const requiredProperties = (table: Metadata): string[] => {
  // * Property is required when column is not nullable
  warn('TODO requiredProperties')
  return table.columns
    .filter((column) => !column.is_nullable) // ! incorrect ( 'YES' or 'NO' )
    .map((column) => column.column_name)
}

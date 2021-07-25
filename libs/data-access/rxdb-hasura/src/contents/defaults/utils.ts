import { ColumnFragment, Metadata } from '../../types'

export const hasDefaultValue = (table: Metadata, propertyName: string) => {
  // TODO default relationships values?

  return columnHasDefaultValue(
    table.columns.find((col) => col.name === propertyName)
  )
}

export const columnHasDefaultValue = (column?: ColumnFragment) =>
  !!column?.default

import { Metadata } from '../../metadata'
import { ColumnFragment } from '../../types'

export const hasDefaultValue = (table: Metadata, propertyName: string) => {
  return (
    columnHasDefaultValue(
      table.columns.find(({ name }) => name === propertyName)
    ) ||
    relationshipHasDefaultValues(
      table.relationships.find(({ name }) => name === propertyName)
    )
  )
}

export const columnHasDefaultValue = (column?: ColumnFragment) =>
  !!column?.default

export const relationshipHasDefaultValues = (
  relationship?: Metadata['relationships'][0]
) =>
  !!relationship &&
  // TODO default array relationship values?
  relationship.type === 'object' &&
  relationship.mapping.every((mapping) => !!mapping.column.default)

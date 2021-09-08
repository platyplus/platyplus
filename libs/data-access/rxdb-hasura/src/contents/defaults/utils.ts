import { Column, Relationship, TableInfo } from '../../metadata'
import { relationshipMapping } from '../relationships'

export const hasDefaultValue = (table: TableInfo, propertyName: string) => {
  return (
    columnHasDefaultValue(
      table.columns.find(({ name }) => name === propertyName)
    ) ||
    // TODO default array relationship values?
    relationshipHasDefaultValues(
      table,
      table.metadata.object_relationships?.find(
        ({ name }) => name === propertyName
      )
    )
  )
}

export const columnHasDefaultValue = (column?: Column) => !!column?.default

const relationshipHasDefaultValues = (
  table: TableInfo,
  relationship?: Relationship
) =>
  !!relationship &&
  // TODO default array relationship values?
  Object.keys(relationshipMapping(table, relationship)).every(
    (colName) => !!table.columns.find(({ name }) => name === colName).default
  )

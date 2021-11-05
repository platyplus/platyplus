import { Column, Relationship, TableInfo } from '../../metadata'
import { getColumn } from '../columns'
import { relationshipMapping } from '../relationships'

export const hasDefaultValue = (table: TableInfo, propertyName: string) => {
  return (
    columnHasDefaultValue(getColumn(table, propertyName)) ||
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
    (colName) => !!getColumn(table, colName).default
  )

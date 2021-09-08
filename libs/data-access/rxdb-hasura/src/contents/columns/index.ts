import { TopLevelProperty } from 'rxdb/dist/types/types'

import { JsonSchemaFormat, TableInformation } from '../../metadata'
import { ID_COLUMN, isIdColumn } from '../ids'
import { propertyJsonType } from '../properties'
import { relationshipMapping } from '../relationships'
export const DELETED_COLUMN = 'deleted'
export const UPDATED_AT_COLUMN = 'updated_at'
export const SYSTEM_COLUMNS = [DELETED_COLUMN, ID_COLUMN, UPDATED_AT_COLUMN]
const postgresJsonSchemaFormatMapping: Record<string, JsonSchemaFormat> = {
  // * Postgres timestamp without timezone does not fit with a default json schema format
  timestamptz: 'date-time',
  time: 'time',
  timetz: 'time',
  date: 'date'
}

export const columnProperties = (
  table: TableInformation,
  excludeSystemColumns = false
) => {
  const skipRelationships =
    table.metadata.object_relationships
      ?.map((rel) => relationshipMapping(table, rel))
      .filter((mapping) => Object.keys(mapping).length === 1)
      .map((mapping) => Object.keys(mapping)[0]) || []
  return table.columns.filter(
    (column) =>
      // * filter properties that are already mapped by an object relationship
      (!skipRelationships.includes(column.name) ||
        // * filter relationships using the primary key as foreign key
        isIdColumn(table, column)) &&
      !(excludeSystemColumns && SYSTEM_COLUMNS.includes(column.name))
  )
}

export const createColumnProperties = (table: TableInformation) => {
  const result: Record<string, TopLevelProperty> = {}
  columnProperties(table, true).forEach((column) => {
    const sqlType = column.udtName
    const type = propertyJsonType(table, column)
    const property: TopLevelProperty = {
      type
    }

    if (type === 'string' || type.includes('string')) {
      const format = postgresJsonSchemaFormatMapping[sqlType]
      if (format) {
        property.format = format
      }
    }
    result[column.name] = property
  })
  return result as Record<string, TopLevelProperty> & {
    updated_at: TopLevelProperty
  }
}

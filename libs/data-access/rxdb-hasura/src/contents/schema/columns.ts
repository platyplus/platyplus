import { TopLevelProperty } from 'rxdb/dist/types/types'

import { ColumnFragment } from '../../generated'
import { JsonSchemaFormat, Metadata } from '../../types'
import { isIdColumn } from './id'
import { propertyJsonType } from './property'

const postgresJsonSchemaFormatMapping: Record<string, JsonSchemaFormat> = {
  // * Postgres timestamp without timezone does not fit with a default json schema format
  timestamptz: 'date-time',
  time: 'time',
  timetz: 'time',
  date: 'date'
}

export const graphQLColumnType = (
  column?: ColumnFragment
): 'uuid' | 'String' => {
  // TODO incomplete
  if (column?.udtName === 'uuid') return 'uuid'
  else return 'String'
}

const propertyFormat = (udtType: string): JsonSchemaFormat | undefined => {
  return postgresJsonSchemaFormatMapping[udtType]
}

export const columnProperties = (table: Metadata) => {
  const skipRelationships = table.relationships
    .filter(
      (relationship) =>
        relationship.rel_type === 'object' && relationship.mapping.length === 1
    )
    .map((relationship) => relationship.mapping[0].column?.name)
  return (
    table.columns
      .filter(
        (column) =>
          // * filter properties that are already mapped by an object relationship
          !skipRelationships.includes(column.name) ||
          // * filter relationships using the primary key as foreign key
          isIdColumn(column)
      )
      // * Do not add the deleted column to the properties
      .filter((column) => !['deleted'].includes(column.name))
  )
}

export const createColumnProperties = (table: Metadata) => {
  const result: Record<string, TopLevelProperty> = {}
  columnProperties(table).forEach((column) => {
    const sqlType = column.udtName
    const type = propertyJsonType(column)
    // * Load custom JSON Schema, if it exists
    const customSchema = column.config?.json_schema
    const property: TopLevelProperty = customSchema || {
      type
    }

    if (type === 'string' || type.includes('string')) {
      const format = propertyFormat(sqlType)
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

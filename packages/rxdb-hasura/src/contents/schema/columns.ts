import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'

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
  if (column?.udt_name === 'uuid') return 'uuid'
  else return 'String'
}

const propertyFormat = (udtType: string): JsonSchemaFormat | undefined => {
  return postgresJsonSchemaFormatMapping[udtType]
}

export const createColumnProperties = (
  table: Metadata
): Record<string, TopLevelProperty | PrimaryProperty> => {
  const result: Record<string, TopLevelProperty | PrimaryProperty> = {}
  const skipRelationships = table.relationships
    .filter(
      relationship =>
        relationship.rel_type === 'object' && relationship.mapping.length === 1
    )
    .map(relationship => relationship.mapping[0].column?.column_name)
  table.columns
    .filter(
      column =>
        // *filter properties that are already mapped by an object relationship
        !skipRelationships.includes(column.column_name as string) ||
        // * filter relationships using the primary key as foreign key
        isIdColumn(column)
    )
    // * Do not add the deleted column to the properties
    .filter(column => column.column_name !== 'deleted')
    .map(column => {
      const sqlType = column.udt_name as string
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
      // * Set primary key column
      if (isIdColumn(column)) {
        ;(property as PrimaryProperty).primary = true
      }
      result[column.column_name as string] = property
    })
  return result
}

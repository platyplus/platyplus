import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'

import { JsonSchemaFormat, Metadata } from '../../types'
import { propertyJsonType } from './property'

const postgresJsonSchemaFormatMapping: Record<string, JsonSchemaFormat> = {
  // * Postgres timestamp without timezone does not fit with a default json schema format
  timestamptz: 'date-time',
  time: 'time',
  timetz: 'time',
  date: 'date'
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
        relationship.rel_type === 'object' && relationship.mapping.length
    )
    .map(relationship => relationship.mapping[0].column?.column_name)
  table.columns
    // * Do not include again properties that are already mapped by an object relationship
    .filter(column => !skipRelationships.includes(column.column_name as string))
    // * Do not add the deleted column to the properties
    .filter(column => column.column_name !== 'deleted')
    .map(column => {
      const sqlType = column.udt_name as string
      const type = propertyJsonType(column)

      const property: TopLevelProperty = {
        type
      }

      if (type === 'string' || type.includes('string')) {
        const format = propertyFormat(sqlType)
        if (format) {
          property.format = format
        }
      }
      // * Set primary key column
      if (column.primaryKey) {
        ;(property as PrimaryProperty).primary = true
      }
      result[column.column_name as string] = property
    })
  return result
}

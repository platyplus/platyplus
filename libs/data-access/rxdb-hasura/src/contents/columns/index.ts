import { TopLevelProperty } from 'rxdb/dist/types/types'

import { ColumnFragment } from '../../generated'
import { JsonSchemaFormat, Metadata } from '../../types'
import { isIdColumn } from '../ids'
import { propertyJsonType } from '../properties'

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
        relationship.type === 'object' && relationship.mapping.length === 1
    )
    .map((relationship) => relationship.mapping[0].column?.name)
  return (
    table.columns
      // * Do not add the system columns to the properties
      .filter((column) => !['deleted', 'updated_at'].includes(column.name))
      .filter(
        (column) =>
          // * filter properties that are already mapped by an object relationship
          !skipRelationships.includes(column.name) ||
          // * filter relationships using the primary key as foreign key
          isIdColumn(column)
      )
  )
}

export const createColumnProperties = (table: Metadata) => {
  const result: Record<string, TopLevelProperty> = {}
  columnProperties(table).forEach((column) => {
    const sqlType = column.udtName
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
    result[column.name] = property
  })
  return result as Record<string, TopLevelProperty> & {
    updated_at: TopLevelProperty
  }
}

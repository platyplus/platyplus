import {
  JsonSchemaPropertyType,
  Property,
  PropertyType,
  TableInformation
} from '../../metadata'
import { filteredRelationships } from '../relationships'

import { columnProperties } from '../columns'
import {
  isNullableColumn,
  isRequiredColumn,
  isRequiredRelationship
} from '../required'
import { isIdColumn } from '../ids'
import { Column, TableInfo } from '../../types'

const postgresJsonSchemaTypeMapping: Record<
  string,
  JsonSchemaPropertyType | JsonSchemaPropertyType[]
> = {
  uuid: 'string',
  bool: 'boolean',
  timestamp: 'string',
  timestamptz: 'string',
  date: 'string',
  timetz: 'string',
  time: 'string',
  text: 'string',
  citext: 'string',
  varchar: 'string',
  jsonb: ['object', 'array'],
  numeric: 'number',
  int: 'integer',
  int4: 'integer',
  int8: 'integer',
  float4: 'number',
  name: 'string',
  bigint: 'integer',
  real: 'number',
  decimal: 'number'
}

const mainPropertyJsonType = (
  columnInfo: Column
): JsonSchemaPropertyType | JsonSchemaPropertyType[] => {
  const udtType = columnInfo.udtName
  const result = postgresJsonSchemaTypeMapping[udtType]
  if (!result)
    throw Error(`PostgresSQL type "${udtType}" is not mapped to JSON Schema`)
  return result
}

export const propertyJsonType = (
  table: Partial<TableInfo>,
  columnInfo: Column
): PropertyType | PropertyType[] => {
  const result = mainPropertyJsonType(columnInfo)
  return isNullableColumn(columnInfo) && !isIdColumn(table, columnInfo)
    ? [...(typeof result === 'string' ? [result] : result), 'null']
    : result
}

export const isTextType = (type: PropertyType): boolean =>
  [
    'string',
    'date',
    'date-time',
    'time',
    'email',
    'document',
    'collection'
  ].includes(type)

export const propertyNames = (table: Partial<TableInfo>) => {
  return [
    ...columnProperties(table).map(({ name }) => name),
    ...filteredRelationships(table).map(({ name }) => name)
  ]
}

const typesMapping: Record<string, PropertyType> = {
  uuid: 'string',
  bool: 'boolean',
  timestamp: 'date-time',
  timestamptz: 'date-time',
  date: 'date',
  timetz: 'time',
  time: 'time',
  text: 'string',
  citext: 'string',
  varchar: 'string',
  jsonb: 'json',
  numeric: 'number',
  int: 'integer',
  int4: 'integer',
  int8: 'integer',
  float4: 'number',
  name: 'string',
  bigint: 'integer',
  real: 'number',
  decimal: 'number'
}

export const tableProperties = (
  table: TableInformation
): Map<string, Property> => {
  const result = new Map()

  columnProperties(table).forEach((col) => {
    result.set(col.name, {
      name: col.name,
      column: col,
      type: typesMapping[col.udtName],
      required: isRequiredColumn(table, col),
      primary: table.primaryKey.columns.includes(col.name)
    })
  })

  table.metadata.array_relationships?.forEach((rel) => {
    result.set(rel.name, {
      name: rel.name,
      relationship: rel,
      type: 'collection',
      required: isRequiredRelationship(table, rel),
      primary: false
    })
  })
  table.metadata.object_relationships?.forEach((rel) => {
    result.set(rel.name, {
      name: rel.name,
      relationship: rel,
      type: 'object',
      required: isRequiredRelationship(table, rel),
      primary: false
    })
  })
  return result
}

import { ColumnFragment } from '../../types'
import { columnProperties } from '../columns'

import { isNullableColumn } from '../required'
import { isIdColumn } from '../ids'
import { JsonSchemaPropertyType, PropertyType } from '../../metadata'

import { TableFragment } from '../../generated'

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
  columnInfo: ColumnFragment
): JsonSchemaPropertyType | JsonSchemaPropertyType[] => {
  const udtType = columnInfo.udtName
  const result = postgresJsonSchemaTypeMapping[udtType]
  if (!result)
    throw Error(`PostgresSQL type "${udtType}" is not mapped to JSON Schema`)
  return result
}

export const propertyJsonType = (
  columnInfo: ColumnFragment
): PropertyType | PropertyType[] => {
  const result = mainPropertyJsonType(columnInfo)
  return isNullableColumn(columnInfo) && !isIdColumn(columnInfo)
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

export const propertyNames = (table: TableFragment) => {
  return [
    ...columnProperties(table).map(({ name }) => name),
    ...table.relationships.map(({ name }) => name)
  ]
}

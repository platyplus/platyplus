import {
  ColumnFragment,
  ContentsDocument,
  JsonSchemaPropertyType,
  PropertyType,
  PropertyValue
} from '../types'

const postgresJsonSchemaTypeMapping: Record<string, PropertyType> = {
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
  jsonb: 'object',
  numeric: 'number',
  // int: 'integer',
  int4: 'integer',
  int8: 'integer',
  float4: 'number'
  // bigint: 'integer',
  // real: 'number',
  // decimal: 'number'
}

export const propertyJsonType = (
  columnInfo: ColumnFragment
): JsonSchemaPropertyType | JsonSchemaPropertyType[] => {
  const udtType = columnInfo.udt_name as string
  // TODO change is_nullable to boolean value in SQL view definition
  const isNullable = columnInfo.is_nullable === 'YES'
  if (!postgresJsonSchemaTypeMapping[udtType])
    throw Error(`PostgresSQL type "${udtType}" is not mapped to JSON Schema`)
  const result = (postgresJsonSchemaTypeMapping[udtType] ||
    udtType) as JsonSchemaPropertyType
  return isNullable ? [result, 'null'] : result
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

export const castValue = <T extends PropertyValue>(
  document: ContentsDocument,
  propertyName: string,
  value: string | boolean
): T => {
  const type = document.propertyType(propertyName)

  return typeof value === 'boolean' || isTextType(type)
    ? value
    : JSON.parse(value)
}

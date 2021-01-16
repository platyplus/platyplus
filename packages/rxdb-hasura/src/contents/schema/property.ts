import {
  ColumnFragment,
  JsonSchemaPropertyType,
  PropertyType
} from '../../types'

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

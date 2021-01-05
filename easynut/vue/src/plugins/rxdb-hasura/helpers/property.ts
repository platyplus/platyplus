import { PrimaryProperty } from 'rxdb'
import { TopLevelProperty } from 'rxdb/dist/types/types'

import {
  ColumnFragment,
  GenericRxDocument,
  JsonSchemaFormat,
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

/**
 * returns the property type as a string, even when the type is ['typename', 'null']
 * If string, returns the format
 * If string and ref, returns 'object'
 * does not allow composite types e.g. ['string', 'object']
 */
export const propertyType = (
  property: TopLevelProperty | PrimaryProperty
): PropertyType => {
  if (!property.type)
    throw Error(`No type in prop: ${JSON.stringify(property)}`)
  let type: JsonSchemaPropertyType
  if (Array.isArray(property.type)) {
    const res = property.type.filter(v => v !== 'null')
    if (res.length === 1) type = res[0] as JsonSchemaPropertyType
    else
      throw Error(
        `Composite types are not allowed: ${JSON.stringify(property)}`
      )
  } else {
    type = property.type as JsonSchemaPropertyType
  }
  if (property.ref) {
    if (type === 'array') return 'collection'
    else return 'document'
  }
  return (property.format as JsonSchemaFormat) || type
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
  document: GenericRxDocument,
  propertyName: string,
  value: string | boolean
): T => {
  const type = propertyType(
    document.collection.schema.jsonSchema.properties[propertyName]
  )

  return typeof value === 'boolean' || isTextType(type)
    ? value
    : JSON.parse(value)
}

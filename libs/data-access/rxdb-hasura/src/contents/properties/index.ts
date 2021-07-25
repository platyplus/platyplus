import {
  ColumnFragment,
  ContentsCollection,
  ContentsDocument,
  JsonSchemaFormat,
  JsonSchemaPropertyType,
  Metadata,
  PropertyType,
  PropertyValue
} from '../../types'
import { columnProperties, isIdColumn } from '../schema'

import { isNullableColumn } from '../required'

const postgresJsonSchemaTypeMapping: Record<string, JsonSchemaPropertyType> = {
  // TODO complete e.g. GIS
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
  int: 'integer',
  int4: 'integer',
  int8: 'integer',
  float4: 'number',
  name: 'string',
  bigint: 'integer',
  real: 'number',
  decimal: 'number'
}

export const mainPropertyJsonType = (
  columnInfo: ColumnFragment
): JsonSchemaPropertyType => {
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
    ? [result, 'null']
    : result
}

export const collectionPropertyType = (
  collection: ContentsCollection,
  propertyName: string,
  includeFormat = true
): PropertyType => {
  const property = collection.schema.jsonSchema.properties[propertyName]
  if (!property.type)
    throw Error(`No type in prop: ${JSON.stringify(property)}`)
  let type: JsonSchemaPropertyType
  if (Array.isArray(property.type)) {
    const res = property.type.filter((v) => v !== 'null')
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
  if (includeFormat) return (property.format as JsonSchemaFormat) || type
  else return type
}

/**
 * returns the property type as a string, even when the type is ['typename', 'null']
 * If string, returns the format
 * If string and ref, returns 'object'
 * does not allow composite types e.g. ['string', 'object']
 */
export const propertyType = (
  document: ContentsDocument,
  propertyName: string,
  includeFormat = true
): PropertyType =>
  collectionPropertyType(document.collection, propertyName, includeFormat)

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
  const type = propertyType(document, propertyName)
  if (typeof value === 'boolean' || isTextType(type)) return value as T
  else {
    if (value != null) return JSON.parse(value)
    else return null
  }
}

export const propertyNames = (table: Metadata) => {
  return [
    ...columnProperties(table).map((col) => col.name),
    ...table.relationships.map((rel) => rel.rel_name)
  ]
}

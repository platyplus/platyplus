import {
  ColumnFragment,
  Contents,
  ContentsCollection,
  JsonSchemaFormat,
  JsonSchemaPropertyType,
  Metadata,
  Property,
  PropertyType
} from '../../types'
import { columnProperties } from '../columns'

import {
  isNullableColumn,
  isRequiredColumn,
  isRequiredRelationship
} from '../required'
import { isIdColumn } from '../ids'
import { metadataStore } from '../../metadata'
import { isManyToManyTable } from '../relationships'

const postgresJsonSchemaTypeMapping: Record<
  string,
  JsonSchemaPropertyType | JsonSchemaPropertyType[]
> = {
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

export const collectionPropertyType = (
  collection: ContentsCollection,
  propertyName: string,
  includeFormat = true
): PropertyType => {
  const property = collection.schema.jsonSchema.properties[propertyName]
  if (!property) return null
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
  metadata: Metadata,
  document: Contents,
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

export const propertyNames = (table: Metadata) => {
  return [
    ...columnProperties(table).map(({ name }) => name),
    ...table.relationships.map(({ name }) => name)
  ]
}

const getProperties = (metadata: Metadata) => {
  // TODO exclude some properties
  // TODO order properties
  // TODO computed fields
  const result = []
  metadata.columns.forEach((col) => result.push(col.name))
  metadata.relationships.forEach((rel) => result.push(rel.name))
  return result
}

const typesMapping: Record<string, PropertyType> = {
  // TODO complete e.g. GIS
  uuid: 'uuid',
  bool: 'boolean',
  timestamp: 'string',
  timestamptz: 'string',
  date: 'string',
  timetz: 'string',
  time: 'string',
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

export const metadataProperties = (
  metadata: Metadata,
  options?: { all?: boolean; role?: string; order?: boolean }
) => {
  if (!metadata) return null
  // TODO order
  // const tableConfig = metadataStore.getState().config.tables[metadata.id] || {}
  const propertiesConfig = metadataStore.getState().config.properties
  const result: Map<string, Property> = new Map()
  const columns =
    options?.all === true ? metadata?.columns : columnProperties(metadata)
  columns.forEach((col) => {
    const isPrimary = metadata.primaryKey.columns
      .map((c) => c.columnName)
      .includes(col.name)
    if (options?.all === true || !isPrimary) {
      const property: Property = {
        column: col,
        type: typesMapping[col.udtName],
        required: isRequiredColumn(col),
        primary: isPrimary,
        config: propertiesConfig[`${metadata.id}.${col.name}`]
      }
      result.set(col.name, property)
    }
  })
  metadata?.relationships
    .filter((rel) => rel.remoteTable)
    .forEach((rel) => {
      const property: Property = {
        relationship: {
          ...rel,
          ref: isManyToManyTable(rel.remoteTable)
            ? rel.remoteTable.relationships.find(
                (rel) => rel.remoteTable.id !== metadata.id
              ).remoteTable.id
            : rel.remoteTable.id
        },
        type: rel.type === 'object' ? 'document' : 'collection',
        required: isRequiredRelationship(rel),
        primary: false,
        config: propertiesConfig[`${metadata.id}.${rel.name}`]
      }
      result.set(rel.name, property)
    })
  return result
}

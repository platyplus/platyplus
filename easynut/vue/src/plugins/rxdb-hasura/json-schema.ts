/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { RxJsonSchema } from 'rxdb'
import { PrimaryProperty } from 'rxdb'
import { JsonSchemaTypes, TopLevelProperty } from 'rxdb/dist/types/types'

import {
  ColumnFragment,
  CoreTableFragment,
  TableFragment
} from '../../generated'
import { fullTableName } from './helpers'

type JsonSchemaFormat =
  | 'date-time'
  | 'email'
  | 'hostname'
  | 'ipv4'
  | 'ipv6'
  | 'uri'
  | string

const postgresJsonSchemaTypeMapping: Record<string, JsonSchemaTypes> = {
  uuid: 'string',
  bool: 'boolean',
  timestamptz: 'string',
  timetz: 'string',
  text: 'string',
  citext: 'string',
  varchar: 'string',
  jsonb: 'object',
  int: 'integer',
  bigint: 'integer',
  real: 'number',
  decimal: 'number'
}

const propertyType = (columnInfo: ColumnFragment): string | string[] => {
  const udtType = columnInfo.udt_name as string
  // TODO change is_nullable to boolean value in SQL view definition
  const isNullable = columnInfo.is_nullable === 'YES'
  if (!postgresJsonSchemaTypeMapping[udtType])
    throw Error(`PostgresSQL type "${udtType}" is not mapped to JSON Schema`)
  const result = postgresJsonSchemaTypeMapping[udtType] || udtType
  return isNullable ? [result, 'null'] : result
}

const postgresJsonSchemaFormatMapping: Record<string, JsonSchemaFormat> = {
  timestamptz: 'date-time',
  timetz: 'date-time'
}

const propertyFormat = (udtType: string): string | undefined => {
  return postgresJsonSchemaFormatMapping[udtType]
}

export const toJsonSchema = (table: TableFragment): RxJsonSchema => {
  // TODO get the query/mutations/subscription names for building graphql queries

  const result: RxJsonSchema = {
    type: 'object',
    title: fullTableName(table),
    description: '', // TODO table comment not in metadata yet
    version: 0,
    properties: {},
    required: [],
    indexes: []
  }

  // TODO custom domains
  // See https://dba.stackexchange.com/questions/68266/what-is-the-best-way-to-store-an-email-address-in-postgresql
  // TODO indexes
  // TODO unique columns or sets of columns: tricky. in a hook? don't forget to index. See https://github.com/pubkey/rxdb/issues/728
  // TODO min/max number values
  // TODO default values (in a hook)
  // TODO computed values / functions (to be defined)
  // TODO validation (to be defined). check constraints. Put what can be put in json schema, the rest in a hook
  // TODO final values (if no update permissions?)
  // TODO encryption (to be defined)
  // TODO relationships
  // ? additionalProperties: true

  // * Map relationship properties
  const skipMappedForeignKeys: string[] = []
  table.relationships.map(relationship => {
    const relName = relationship.rel_name as string
    const mappingItem = relationship.mapping[0]
    const column = mappingItem.column as ColumnFragment
    const refTable = mappingItem.remoteTable as CoreTableFragment
    const ref = fullTableName(refTable)
    const type = propertyType(column)
    if (relationship.mapping.length !== 1)
      throw Error(
        'object relationship with multi-column keys are not supported'
      )
    if (relationship.rel_type === 'object') {
      // * Object relationships
      relationship.mapping[0].remoteTable
      result.properties[relName] = {
        type,
        ref
      }
      skipMappedForeignKeys.push(column.column_name as string)
    } else if (relationship.rel_type === 'array') {
      // * Array relationships
      result.properties[relName] = {
        type: 'array',
        ref,
        items: {
          type
        }
      }
    }
  })

  // TODO filter out foreign keys
  table.columns.map(column => {
    // * Do not include again properties that are already mapped by an object relationship
    if (skipMappedForeignKeys.includes(column.column_name as string)) return
    const name = column.column_name!
    const sqlType = column.udt_name!

    const type = propertyType(column)

    if (!column.is_nullable) {
      // * Property is required when column is not nullable
      result.required?.push(name)
    }

    const property: TopLevelProperty = {
      type
    }

    const format = propertyFormat(sqlType)
    if (format) {
      property.format = format
    }
    // * Set primary key column
    if (column.primaryKey) {
      ;(property as PrimaryProperty).primary = true
    }
    result.properties[name] = property
  })
  return result
}

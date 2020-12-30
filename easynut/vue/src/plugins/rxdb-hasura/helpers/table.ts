import { PrimaryProperty, RxJsonSchema } from 'rxdb'
import { TopLevelProperty } from 'rxdb/dist/types/types'

import {
  ColumnFragment,
  CoreTableFragment,
  TableFragment
} from '../../../generated'
import { JsonSchemaFormat } from '../types'
import { propertyJsonType } from './property'

export const fullTableName = (data: CoreTableFragment): string =>
  data.table_schema === 'public'
    ? `${data.table_name}`
    : `${data.table_schema}_${data.table_name}`

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
    const type = propertyJsonType(column)
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
      // * Add the relationship aggregates - it is needed for the replication system
      result.properties[`${relName}_aggregate`] = {
        type: 'object',
        properties: {
          aggregate: {
            type: 'object',
            properties: {
              max: {
                type: 'object',
                properties: { updated_at: { type: ['string', 'null'] } }
              }
            }
          }
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

    const type = propertyJsonType(column)

    if (!column.is_nullable) {
      // * Property is required when column is not nullable
      result.required?.push(name)
    }

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
    result.properties[name] = property
  })
  return result
}

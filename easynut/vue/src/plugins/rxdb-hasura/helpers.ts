import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'

import { CoreTableFragment, TableFragment } from '../../generated'
import { ValuesOf } from '../../utils/helpers'

export const fullTableName = (data: CoreTableFragment): string =>
  data.table_schema === 'public'
    ? `${data.table_name}`
    : `${data.table_schema}_${data.table_name}`

enum LOG_LEVEL {
  MUTE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4
}

// TODO set level in an environment variable
const VERBOSE_LEVEL =
  process.env.NODE_ENV === 'development' ? LOG_LEVEL.INFO : LOG_LEVEL.ERROR

export const debug = (...args: unknown[]): unknown =>
  VERBOSE_LEVEL >= LOG_LEVEL.DEBUG && console.log(...args)
export const info = (...args: unknown[]): unknown =>
  VERBOSE_LEVEL >= LOG_LEVEL.INFO && console.log(...args)
export const warn = (...args: unknown[]): unknown =>
  VERBOSE_LEVEL >= LOG_LEVEL.WARN && console.warn(...args)
export const error = (...args: unknown[]): unknown =>
  VERBOSE_LEVEL >= LOG_LEVEL.ERROR && console.warn(...args)

/**
 * returns the property type as a string, even when the type is ['typename', 'null']
 * If string, returns the format
 * If string and ref, returns 'object'
 * does not allow composite types e.g. ['string', 'object']
 */
export const propertyType = (
  property: TopLevelProperty | PrimaryProperty
): string => {
  if (!property.type)
    throw Error(`No type in prop: ${JSON.stringify(property)}`)
  let type: string
  if (Array.isArray(property.type)) {
    const res = property.type.filter(v => v !== 'null')
    if (res.length === 1) type = res[0]
    else
      throw Error(
        `Composite types are not allowed: ${JSON.stringify(property)}`
      )
  } else {
    type = property.type
  }
  if (property.ref) {
    if (type === 'array') return 'collection'
    else return 'document'
  }
  return property.format || type
}

/**
 * * Maps all object relationships of the table, and returns the  array relationships of corresponding remote tables
 * @param table
 * @param tables
 */
export const getReverseOneToMany = (
  table: TableFragment,
  tables: Record<string, TableFragment>
): Array<{
  remoteTable: TableFragment
  from: ValuesOf<TableFragment['relationships']>
  to: ValuesOf<TableFragment['relationships']>
}> =>
  table.relationships
    .filter(({ rel_type }) => rel_type === 'object')
    .reduce<
      Array<{
        remoteTable: TableFragment
        from: ValuesOf<TableFragment['relationships']>
      }>
    >(
      (aggr, relation) => [
        ...aggr,
        ...Object.values(tables)
          .filter(curs =>
            relation.mapping.some(
              m =>
                m.remoteTable?.table_name === curs.table_name &&
                m.remoteTable?.table_schema === curs.table_schema
            )
          )
          .map(table => ({ remoteTable: table, from: relation }))
      ],
      []
    )
    .map(({ remoteTable, from }) =>
      remoteTable.relationships
        .filter(
          rel =>
            rel.rel_type === 'array' &&
            rel.mapping.some(
              m =>
                m?.remoteTable?.table_name === table.table_name &&
                m.remoteTable?.table_schema === table.table_schema
            )
        )
        .map(remote => ({ remoteTable, from, to: remote }))
    )
    .reduce<
      Array<{
        remoteTable: TableFragment
        from: ValuesOf<TableFragment['relationships']>
        to: ValuesOf<TableFragment['relationships']>
      }>
    >((aggr, curr) => [...aggr, ...curr], [])

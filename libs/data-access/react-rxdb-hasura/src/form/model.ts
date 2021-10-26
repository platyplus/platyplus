// TODO dependency to rsuite in @platyplus/react-rxdb-schema
import { Schema } from 'rsuite'
import { useMemo } from 'react'

import { error, warn } from '@platyplus/logger'
import { TableInformation, tableProperties } from '@platyplus/rxdb-hasura'

import { TopLevelProperty } from 'rxdb/dist/types/types'

const { Model, Types } = Schema

export type JsonSchemaFormat =
  | 'date-time'
  | 'time'
  | 'date'
  | 'email'
  | 'hostname'
  | 'ipv4'
  | 'ipv6'
  | 'uri'

export type JsonSchemaPropertyType =
  | 'number'
  | 'object'
  | 'array'
  | 'string'
  | 'integer'
  | 'boolean'
  | 'null'

export type CustomTypes = 'collection' | 'document' | 'integer'

const modelTypeConstructor = {
  collection: () => Types.ArrayType(),
  document: () => Types.StringType(),
  'date-time': () => Types.DateType(),
  time: () => Types.DateType(),
  date: () => Types.DateType(),
  number: () => Types.NumberType(),
  object: () => Types.ObjectType(),
  array: () => Types.ArrayType(),
  string: () => Types.StringType(),
  integer: () => Types.NumberType(),
  boolean: () => Types.BooleanType(),
  null: (name: string, property: TopLevelProperty) => {
    error('Null type is not allowed', { name, property })
    throw Error('Null type is not allowed')
  }
}

export const useFormModel = (tableInfo: TableInformation) => {
  const properties = tableProperties(tableInfo)
  return useMemo(
    () =>
      Model(
        [...properties.entries()].reduce((acc, [name, property]) => {
          const type = property.type
          const modelType = modelTypeConstructor[type]?.(name, property)
          if (!modelType) {
            warn('Unknown model type for property', property)
          } else {
            if (property.required) {
              if (type === 'collection' || type === 'array') {
                modelType.isRequiredOrEmpty()
              } else {
                modelType.isRequired('This field is required')
              }
            }
            acc[name] = modelType
          }
          return acc
        }, {})
      ),
    [properties]
  )
}

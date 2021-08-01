// TODO dependency to rsuite in @platyplus/react-rxdb-schema
import { Schema } from 'rsuite'
import { useMemo } from 'react'

import { Metadata } from '@platyplus/rxdb-hasura'

import { TopLevelProperty } from 'rxdb/dist/types/types'
import { useMetadataProperties } from '../property'

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
  number: () => Types.NumberType(),
  object: () => Types.ObjectType(),
  array: () => Types.ArrayType(),
  string: () => Types.StringType(),
  integer: () => Types.NumberType(),
  boolean: () => Types.BooleanType(),
  null: (name: string, property: TopLevelProperty) => {
    console.error('Null type is not allowed', { name, property })
    throw Error('Null type is not allowed')
  }
}

export const useFormModel = (metadata: Metadata) => {
  const [properties] = useMetadataProperties(metadata)
  return useMemo(
    () =>
      Model(
        metadata && properties
          ? [...properties.entries()].reduce((acc, [name, property]) => {
              const type = property.type
              const modelType = modelTypeConstructor[type](name, property)
              if (property.required) {
                if (type === 'collection' || type === 'array') {
                  modelType.isRequiredOrEmpty()
                } else {
                  modelType.isRequired('This field is required')
                }
              }
              acc[name] = modelType
              return acc
            }, {})
          : {}
      ),
    [metadata, properties]
  )
}

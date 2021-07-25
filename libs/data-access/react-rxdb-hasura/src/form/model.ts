// TODO dependency to rsuite in @platyplus/react-rxdb-schema
import { Schema } from 'rsuite'
import {
  ContentsDocument,
  isRequiredProperty,
  propertyType
} from '@platyplus/rxdb-hasura'
import { useMemo } from 'react'
import { useDocumentMetadata, useDocumentProperties } from '../metadata'

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
  null: () => {
    throw Error('Null type is not allowed')
  }
}

export const useFormModel = (document: ContentsDocument) => {
  const metadata = useDocumentMetadata(document)
  const [properties] = useDocumentProperties(document)
  return useMemo(
    () =>
      Model(
        metadata && properties
          ? [...properties.entries()].reduce((acc, [name, property]) => {
              const type = propertyType(document, name, false)
              const modelType = modelTypeConstructor[type]()
              if (isRequiredProperty(metadata, name)) {
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
    [document, metadata, properties]
  )
}

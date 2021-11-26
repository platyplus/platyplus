// TODO dependency to rsuite in @platyplus/rxdb-hasura
import { Schema } from 'rsuite'

import { error, warn } from '@platyplus/logger'

import { Property, TableInformation } from '../../metadata'
import { tableProperties } from '../properties'
import { Contents, Database } from '../../types'
import { relationshipTable, shiftedTable } from '../relationships'
import { collectionName } from '../../utils'
import { canEdit } from './can'
import { isRequiredProperty } from '../required'

const { Model, Types } = Schema

const modelTypeConstructor: Record<
  string,
  (
    db: Database,
    tableInfo: TableInformation,
    role: string,
    property: Property
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => any
> = {
  collection: (db, tableInfo, role, property) =>
    Types.ArrayType().addRule((value: string[]): Promise<boolean> | boolean => {
      if (!value) return true
      // * check if every id points to an existing document
      const relTable = shiftedTable(tableInfo, property.relationship)
      const relCollectionName = collectionName(relTable, role)
      const collection = db.collections[relCollectionName]
      return collection
        ? collection
            .findByIds(value)
            .then((docs) => value.every((id) => !!docs.get(id)))
        : false
    }, 'One of the referenced documents does not exist'),
  document: (db, tableInfo, role, property) =>
    Types.StringType().addRule(async (value): Promise<boolean> => {
      // * check if the value points to an existing document
      if (!value) return true
      // ? Not really usefull if all form input components do not allow non existing values
      const relTable = relationshipTable(tableInfo, property.relationship)
      const relCollectionName = collectionName(relTable, role)
      const collection = db.collections[relCollectionName]
      // * for some reason, collection.findOne doesn't work. Falling back to findByIds
      const values = await collection.findByIds([value])
      return !!values.get(value)
    }, 'Referenced document does not exist'),
  'date-time': () => Types.DateType(),
  time: () => Types.DateType(),
  date: () => Types.DateType(),
  number: () => Types.NumberType(),
  object: () => Types.ObjectType(),
  array: () => Types.ArrayType(),
  string: () => Types.StringType(),
  integer: () => Types.NumberType(),
  boolean: () => Types.BooleanType(),
  null: (_, __, ___, property) => {
    error(property.name, 'Null type is not allowed', property)
    throw Error('Null type is not allowed')
  }
}

export const createModel = async (
  db: Database,
  tableInfo: TableInformation,
  role: string,
  document: Contents,
  isNew: boolean
) => {
  const properties = []
  for (const property of [...tableProperties(tableInfo).values()]) {
    if (await canEdit(tableInfo, role, document, property.name, isNew)) {
      properties.push(property)
    }
  }
  return Model(
    properties.reduce((acc, property) => {
      const type = property.type
      const modelType = modelTypeConstructor[type]?.(
        db,
        tableInfo,
        role,
        property
      )
      if (!modelType) {
        warn(tableInfo.id, 'Unknown model type for property', property)
      } else {
        if (isRequiredProperty(tableInfo, property.name))
          if (property.required) {
            if (type === 'collection' || type === 'array') {
              modelType.isRequiredOrEmpty()
            } else {
              modelType.isRequired('This field is required')
            }
          }
        acc[property.name] = modelType
      }
      return acc
    }, {})
  )
}

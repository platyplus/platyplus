/* eslint-disable @typescript-eslint/no-explicit-any */
import Handlebars from 'handlebars'
import jsonata from 'jsonata'
import { isRxDocument, RxCollectionHookCallback } from 'rxdb'

import {
  Contents,
  ContentsCollection,
  ContentsDocument,
  ContentsDocumentMethods,
  JsonSchemaPropertyType
} from '../../types'
import { FieldMapItem, rxdbJsonataPaths } from '../../utils'
import { label } from './label'

type ComputedProperty = {
  name: string
  transformation?: string
  template?: string
  type: JsonSchemaPropertyType
}

// * Computes the propertey:
// * 1. use the jsonata transformation, if any
// * 2. use the handlebars template, if any
// * 3. check the result type fits with the property type
const evaluate = (data: any, property: ComputedProperty): any => {
  const { transformation, template, type } = property
  let result: any
  try {
    if (transformation) {
      const formula = jsonata(transformation)
      result = formula.evaluate(data)
    }
    if (template) {
      const compiledTemplate = Handlebars.compile(template, { noEscape: true })
      result = compiledTemplate(
        { ...data, transformation: result },
        { allowProtoPropertiesByDefault: true }
      )
    }

    const typeArray = typeof type === 'string' ? [type] : type
    const resultType = typeof result
    const isNullable = typeArray.includes('null')
    const nullResult = result === null || result === undefined

    if (typeArray.includes('string')) {
      if (nullResult) {
        if (isNullable) return null
        else return ''
      }
      if (typeof result === 'string') return result
      else return JSON.stringify(result)
    } else if (typeArray.includes('array')) {
      if (nullResult && !isNullable) return []
      if (!Array.isArray(result)) throw Error('should be an array')
    } else if (typeArray.includes('object')) {
      if (nullResult && !isNullable) return {}
      if (resultType !== 'object') throw Error('should be an object')
    } else if (typeArray.includes('number')) {
      if (nullResult && !isNullable) return {}
      if (resultType !== 'number') throw Error('should be a number')
    } else if (typeArray.includes('boolean')) {
      if (nullResult && !isNullable) return false
      if (resultType !== 'boolean') throw Error('should be a boolean')
    }
    return result
  } catch (error) {
    console.warn('Error in computing', { data, property })
    console.warn(error)
  }
}

// * Recursively loads data from a document according to a field map
const recurseLoading = async (
  doc: ContentsDocument | Contents,
  collection: ContentsCollection,
  fieldMap: FieldMapItem
): Promise<Contents> => {
  return await Object.entries(fieldMap).reduce<any>(
    async (aggr, [key, value]) => {
      const ref = collection.schema.jsonSchema.properties[key]?.ref
      if (ref) {
        const refCollection = collection.database[ref]
        if (Array.isArray(doc[key])) {
          aggr[key] = await Promise.all(
            doc[key].map(
              async (id: string) =>
                await recurseLoading(
                  await refCollection.findOne(id).exec(),
                  refCollection,
                  value
                )
            )
          )
        } else {
          aggr[key] = await recurseLoading(
            await refCollection.findOne(doc[key]).exec(),
            refCollection,
            value
          )
        }
      } else if (value) {
        ;(await aggr)[key] = doc[key]
      }
      return aggr
    },
    {}
  )
}

// * Expand data from dependend relationships according to a jsonata expression's needs
const expandRxDBData = async (
  contents: Contents,
  collection: ContentsCollection,
  expression: string
): Promise<Contents | null> => {
  const paths = rxdbJsonataPaths(expression, collection)
  return removeDeleted(await recurseLoading(contents, collection, paths))
}

// * Compute the property from either raw content or its expanded values
// * when a collection is passed either from doc.collection or from the optional arg
export const compute = async (
  doc: ContentsDocument | Contents,
  property: ComputedProperty,
  collection?: ContentsCollection
): Promise<any> => {
  const col = isRxDocument(doc) ? doc.collection : collection
  const data =
    col && property.transformation
      ? await expandRxDBData(
          doc,
          col as ContentsCollection,
          property.transformation
        )
      : doc
  return evaluate(data, property as ComputedProperty)
}

export const addComputedFieldsFromCollection = async (
  data: Contents,
  collection: ContentsCollection
): Promise<void> => {
  for (const property of collection.metadata.computedProperties) {
    data[property.name] = compute(
      data,
      property as ComputedProperty,
      collection
    )
  }
  data.label = label(data, collection) || ''
}

export const addComputedFieldsFromDoc: RxCollectionHookCallback<
  Contents,
  ContentsDocumentMethods
> = (data, doc) => {
  addComputedFieldsFromCollection(data, doc.collection as ContentsCollection)
}

// * Filter out recursively deleted documents
const removeDeleted = (data: Contents): Contents | null => {
  if (data !== null && typeof data === 'object') {
    if (data.deleted) {
      return null
    } else {
      return Object.entries(data).reduce<Contents>(
        (aggr, [key, value]) => (
          (aggr[key] = Array.isArray(value)
            ? value.map(v => removeDeleted(v)).filter(v => v)
            : removeDeleted(value)),
          aggr
        ),
        {} as Contents
      )
    }
  } else return data
}

// * Returns the original data enriched with the computed properties defined in this collection
// * Input data is a plain object that contains every value that is required by the transformation definitions
// * This function also filters out data flagged as deleted
export const addComputedFieldsFromLoadedData = (
  data: Contents,
  collection: ContentsCollection
): Contents => {
  if (collection.metadata.computedProperties.length) {
    const filteredData = removeDeleted(data) || data
    for (const property of collection.metadata.computedProperties) {
      filteredData[property.name] = evaluate(
        filteredData,
        property as ComputedProperty
      )
    }
    return filteredData
  } else return data
}

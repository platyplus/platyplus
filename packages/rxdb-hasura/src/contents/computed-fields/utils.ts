/* eslint-disable @typescript-eslint/no-explicit-any */
import Handlebars from 'handlebars'
import jsonata from 'jsonata'
import { RxCollectionHookCallback } from 'rxdb'

import {
  Contents,
  ContentsCollection,
  ContentsDocumentMethods,
  JsonSchemaPropertyType
} from '../../types'
import { label } from './label'

type ComputedProperty = {
  transformation?: string
  template?: string
  type: JsonSchemaPropertyType
}

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

    const arrayType = typeof type === 'string' ? [type] : type

    if (!arrayType.includes('null') && !result) {
      if (arrayType.includes('array')) return []
      if (arrayType.includes('object')) return {}
      if (arrayType.includes('number')) return 0
      if (arrayType.includes('string')) return ''
    } else if (arrayType.includes('string')) {
      if (typeof result === 'string') return result
      else return JSON.stringify(result)
    } else {
      return result
    }
  } catch (error) {
    console.warn('Error in computing', { data, property })
    console.warn(error)
  }
}

export const addComputedFieldsFromCollection = async (
  data: Contents,
  collection: ContentsCollection
): Promise<void> => {
  for (const property of collection.metadata.computedProperties) {
    if (property.transformation) {
      // TODO load data with jsonata schema
      // TODO hide deleted documents
      data[property.name] = evaluate(data, property as ComputedProperty)
    }
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

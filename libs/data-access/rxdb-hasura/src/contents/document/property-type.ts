import {
  ContentsDocument,
  JsonSchemaFormat,
  JsonSchemaPropertyType,
  PropertyType
} from '../../types'

/**
 * returns the property type as a string, even when the type is ['typename', 'null']
 * If string, returns the format
 * If string and ref, returns 'object'
 * does not allow composite types e.g. ['string', 'object']
 */
export const propertyType = (
  document: ContentsDocument,
  propertyName: string
): PropertyType => {
  const property =
    document.collection.schema.jsonSchema.properties[propertyName]
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
  return (property.format as JsonSchemaFormat) || type
}

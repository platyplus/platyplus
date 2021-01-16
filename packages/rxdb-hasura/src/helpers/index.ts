import { ContentsDocument, PropertyType, PropertyValue } from '../types'

const isTextType = (type: PropertyType): boolean =>
  [
    'string',
    'date',
    'date-time',
    'time',
    'email',
    'document',
    'collection'
  ].includes(type)

export const castValue = <T extends PropertyValue>(
  document: ContentsDocument,
  propertyName: string,
  value: string | boolean
): T => {
  const type = document.propertyType(propertyName)

  return typeof value === 'boolean' || isTextType(type)
    ? value
    : JSON.parse(value)
}

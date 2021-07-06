import { propertyType } from '../contents'
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
  const type = propertyType(document, propertyName)
  if (typeof value === 'boolean' || isTextType(type)) return value as T
  else {
    if (value) return JSON.parse(value)
    else return null
  }
}

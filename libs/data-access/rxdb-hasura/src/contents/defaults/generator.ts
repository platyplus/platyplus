import { Contents, ContentsCollection } from '../../types'
import { collectionPropertyType, isTextType } from '../properties'
import { v4 as uuid } from 'uuid'
import { getCollectionMetadata } from '../../metadata'

export const generateDefaultValue = (
  collection: ContentsCollection,
  propertyName: string,
  data: Contents
) => {
  // TODO use Hasura column presets as well
  const table = getCollectionMetadata(collection)
  const column = table.columns.find(({ name }) => name === propertyName)
  if (!column) {
    // TODO default values for relations
    const rel = table.relationships.find(({ name }) => name === propertyName)
    if (rel?.type === 'array') return []
    else return null
  }

  // TODO find a way to parse SQL :/
  const defaultTemplate = column?.default
  if (defaultTemplate) {
    try {
      return JSON.parse(defaultTemplate)
    } catch {
      if (defaultTemplate.startsWith('now()')) return new Date().toISOString()
      if (defaultTemplate.startsWith('gen_random_uuid()')) return uuid()
      console.log('Impossible to parse default value', defaultTemplate)
      return null
    }
  } else {
    const type = collectionPropertyType(collection, propertyName)
    if (isTextType(type)) return ''
    else return null
  }
}

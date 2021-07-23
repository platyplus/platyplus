import { ContentsDocument } from '../../types'
import { isTextType, propertyType } from './property'

export const createDefaultValue = (
  document: ContentsDocument,
  propertyName: string
) => {
  const table = document.collection.metadata
  // TODO use Hasura column presets as well
  const column = table.columns.find((col) => col.name === propertyName)
  if (!column) {
    // TODO default values for relations
    const rel = table.relationships.find((rel) => rel.rel_name === propertyName)
    if (rel?.rel_type === 'array') return []
    else return null
  }

  const defaultTemplate = column?.default
  if (defaultTemplate) {
    try {
      return JSON.parse(defaultTemplate)
    } catch {
      if (defaultTemplate === 'now()') return new Date().toISOString()
      console.log('Impossible to parse default value', defaultTemplate)
      return null
    }
  } else {
    const type = propertyType(document, propertyName)
    if (isTextType(type)) return ''
    else return null
  }
}

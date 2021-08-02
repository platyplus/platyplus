import { Contents } from '../../types'
import { isTextType } from '../properties'
import { v4 as uuid } from 'uuid'
import { Metadata } from '../../metadata'

export const generateDefaultValue = (
  table: Metadata,
  propertyName: string,
  data: Contents
) => {
  // TODO use Hasura column presets as well
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
    const type = table.properties.get(propertyName).type
    if (isTextType(type)) return ''
    else return null
  }
}

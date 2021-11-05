import { v4 as uuid } from 'uuid'

import { warn } from '@platyplus/logger'

import { Contents } from '../../types'
import { TableInformation } from '../../metadata'

import { findRelationship } from '../relationships'
import { isTextType, tableProperties } from '../properties'
import { getColumn } from '../columns'

export const generateDefaultValue = (
  table: TableInformation,
  propertyName: string,
  data: Contents
) => {
  // TODO use Hasura column presets as well
  const column = getColumn(table, propertyName)
  if (!column) {
    // TODO default values for relations
    const rel = findRelationship(table, propertyName)
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
      warn('Impossible to parse default value', defaultTemplate)
      return null
    }
  } else {
    const type = tableProperties(table).get(propertyName).type
    if (isTextType(type)) return ''
    else return null
  }
}

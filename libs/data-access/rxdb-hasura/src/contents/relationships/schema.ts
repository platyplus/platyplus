import { warn } from '@platyplus/logger'
import { TopLevelProperty } from 'rxdb/dist/types/types'
import { TableInformation } from '../../metadata'
import { collectionName } from '../../utils'

import { getColumn } from '../columns'
import { propertyJsonType } from '../properties'

import {
  filteredRelationships,
  relationshipMapping,
  shiftedTable
} from './utils'

export const createRelationshipProperties = (
  table: TableInformation,
  role: string
): Record<string, TopLevelProperty> => {
  const result: Record<string, TopLevelProperty> = {}
  filteredRelationships(table).forEach((relationship) => {
    const refTable = shiftedTable(table, relationship)
    // * Pass any relationship that does not point to another table in the store
    if (refTable) {
      const relName = relationship.name

      const mapping = relationshipMapping(table, relationship)
      // TODO composite keys
      const column = getColumn(table, Object.keys(mapping)[0])
      const ref = collectionName(refTable, role)

      const type = propertyJsonType(table, column)
      if (relationship.type === 'object') {
        // * Object relationships
        result[relName] = {
          type: ['string', 'null'], // ? null only if relationship is nullable?
          ref
        }
      } else if (relationship.type === 'array') {
        // * Array relationships
        result[relName] = {
          type: 'array',
          ref,
          items: {
            type
          }
        }
        // TODO only for many2many relationships
        // * Add the relationship aggregates - it is needed for the replication system
        result[`${relName}_aggregate`] = {
          type: 'object',
          properties: {
            aggregate: {
              type: 'object',
              properties: {
                max: {
                  type: 'object',
                  properties: { updated_at: { type: ['string', 'null'] } }
                }
              }
            }
          }
        }
      }
    } else {
      warn(table.id, `NO REF TABLE`, relationship)
    }
  })

  return result
}

import { TopLevelProperty } from 'rxdb/dist/types/types'
import { TableInformation } from '../../metadata'
import { collectionName } from '../../utils'

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
    if (!refTable) return
    const relName = relationship.name

    const mapping = relationshipMapping(table, relationship)
    // TODO composite keys
    const column = table.columns.find(
      ({ name }) => Object.keys(mapping)[0] === name
    )
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
  })
  return result
}

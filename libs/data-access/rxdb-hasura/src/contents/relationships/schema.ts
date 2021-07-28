import { TopLevelProperty } from 'rxdb/dist/types/types'
import { Metadata } from '../../types'
import { metadataName } from '../../utils'

import { propertyJsonType } from '../properties'
import { filteredRelationships, isManyToManyTable } from './utils'

export const createRelationshipProperties = (
  table: Metadata,
  role: string
): Record<string, TopLevelProperty> => {
  const result: Record<string, TopLevelProperty> = {}
  filteredRelationships(table).forEach((relationship) => {
    const relName = relationship.name
    // TODO relationships with composite keys
    const column = relationship.mapping[0].column
    const refTable = isManyToManyTable(relationship.remoteTable)
      ? relationship.remoteTable.relationships.find(
          (rel) => rel.remoteTable.id !== table.id
        ).remoteTable
      : relationship.remoteTable
    const ref = `${role}_${metadataName(refTable)}`

    const type = propertyJsonType(column)
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

import { TableInformation } from '../../metadata'
import { warn } from '../../utils'
import { tableProperties } from '../properties'
import {
  allRelationships,
  isManyToManyJoinTable,
  relationshipMapping,
  relationshipTable
} from '../relationships'
import { isRequiredColumn } from '../required'
import { canRemove } from './can'

/**
 * Checks if items can be removed from an array relationship
 * @param tableInfo
 * @param propertyName
 * @returns
 */
export const canRemoveCollectionItem = (
  tableInfo: TableInformation,
  propertyName: string,
  role: string
) => {
  const prop = tableProperties(tableInfo).get(propertyName)
  if (prop && prop.type === 'collection') {
    const relationship = allRelationships(tableInfo).find(
      (rel) => rel.name === propertyName
    )
    const remoteInfo = relationshipTable(tableInfo, relationship)
    if (isManyToManyJoinTable(remoteInfo)) {
      return canRemove(remoteInfo, role)
    } else {
      const remoteColumns = Object.values(
        relationshipMapping(tableInfo, relationship)
      )
      return remoteInfo.columns
        .filter((col) => remoteColumns.includes(col.name))
        .every((col) => !isRequiredColumn(remoteInfo, col))
    }
  } else {
    warn(
      `canRemoveItem ${tableInfo.id}.${propertyName}: property not found or incorrect type (non "collection"): ${prop.type}`
    )
    return false
  }
}

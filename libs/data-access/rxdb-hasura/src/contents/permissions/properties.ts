import { warn } from '@platyplus/logger'

import { ADMIN_ROLE } from '../../constants'
import { TableInformation } from '../../metadata'
import { ContentsDocument } from '../../types'

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
export const canRemoveCollectionItem = async (
  tableInfo: TableInformation,
  role: string,
  propertyName: string,
  item: ContentsDocument
) => {
  if (role === ADMIN_ROLE) return true
  const prop = tableProperties(tableInfo).get(propertyName)
  if (prop && prop.type === 'collection') {
    const relationship = allRelationships(tableInfo).find(
      (rel) => rel.name === propertyName
    )
    const remoteInfo = relationshipTable(tableInfo, relationship)
    if (isManyToManyJoinTable(remoteInfo)) {
      return await canRemove(remoteInfo, role, item)
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
      tableInfo.id,
      `canRemoveItem ${propertyName}: property not found or incorrect type (non "collection"): ${prop.type}`
    )
    return false
  }
}

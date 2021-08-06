import { canRemove } from '.'
import { getMetadataTable, Metadata } from '../../metadata'
import { isManyToManyJoinTable } from '../relationships'
import { isRequiredColumn } from '../required'

/**
 * Checks if items can be removed from an array relationship
 * @param metadata
 * @param propertyName
 * @returns
 */
export const canRemoveCollectionItem = (
  metadata: Metadata,
  propertyName: string,
  role: string
) => {
  const prop = metadata.properties.get(propertyName)
  if (prop && prop.type === 'collection') {
    const remoteMetadata = getMetadataTable(prop.relationship.remoteTableId)
    if (isManyToManyJoinTable(remoteMetadata)) {
      return canRemove(remoteMetadata, role)
    } else {
      const remoteColumns = prop.relationship.mapping.map(
        (mapping) => mapping.remoteColumnName
      )
      return remoteMetadata.columns
        .filter((col) => remoteColumns.includes(col.name))
        .every((col) => !isRequiredColumn(col))
    }
  } else {
    console.warn(
      `canRemoveItem ${metadata.id}.${propertyName}: property not found or incorrect type (non "collection"): ${prop.type}`
    )
    return false
  }
}

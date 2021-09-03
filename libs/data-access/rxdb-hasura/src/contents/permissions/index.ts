import { ADMIN_ROLE, Metadata } from '../../metadata'
import { getMetadataTable } from '../../store'
import { Contents } from '../../types'
import { DELETED_COLUMN, SYSTEM_COLUMNS } from '../columns'
import { getIds } from '../ids'
import { isManyToManyJoinTable } from '../relationships'
export * from './properties'

export const canRead = (
  metadata: Metadata,
  role: string,
  propertyName?: string
) => {
  if (propertyName) {
    const property = metadata.properties.get(propertyName)
    if (property.column)
      return property.column.canSelect.some(
        (permission) => permission.roleName === role
      )
    else if (property.relationship) {
      property.relationship.mapping.every(
        (mapping) =>
          metadata.properties
            .get(mapping.column.name)
            ?.column.canSelect.some(
              (permission) => permission.roleName === role
            ) || false
      )
    }
  } else {
    return (
      !isManyToManyJoinTable(metadata) &&
      [...metadata.properties.keys()].some((name) =>
        canRead(metadata, role, name)
      )
    )
  }
}

export const canEdit = (
  metadata: Metadata,
  role: string,
  document?: Contents,
  propertyName?: string
) =>
  !document || document._isTemporary
    ? canCreate(metadata, role, propertyName)
    : canUpdate(metadata, role, propertyName)

export const canSave = () => {
  // ? validate data ?
  // * check hasura permissions
  // * check SQL constraints
  return true
}

export const canRemove = (metadata: Metadata, role: string, doc?: Contents) =>
  canUpdate(metadata, role, DELETED_COLUMN)

export const canCreate = (
  metadata: Metadata,
  role: string,
  fieldName?: string
) => {
  // * PostgreSQL views cannot be edited (as of now)
  if (metadata.view) return false
  if (role === ADMIN_ROLE) return true
  // ? Check the hasura permission rule ?
  if (fieldName) {
    const relationship = metadata.properties.get(fieldName)?.relationship
    if (relationship) {
      if (relationship.type === 'object') {
        // * object relationship: check permission to insert every foreign key column
        return relationship.mapping
          .map((m) => m.column?.name)
          .every((column) => column && canCreate(metadata, role, column))
      } else {
        // * array relationship: check permission to update the foreign key columns
        const refMetadata = getMetadataTable(relationship.remoteTableId)
        return !!relationship?.mapping.every((m) =>
          canUpdate(refMetadata, m.remoteColumnName)
        )
      }
    } else {
      // * Column
      return metadata.columns.some(
        (col) =>
          col.name === fieldName &&
          col.canInsert.some((permission) => permission.roleName === role)
      )
    }
  } else {
    const ids = getIds(metadata)
    // * Must have at least one insertable user-defined column, and id must be insertable as well
    return (
      metadata.columns
        .filter(({ name }) => !SYSTEM_COLUMNS.includes(name))
        .some((col) =>
          col.canInsert.some((permission) => permission.roleName === role)
        ) &&
      metadata.columns
        .filter(({ name }) => ids.includes(name))
        .every((col) =>
          col.canInsert.some((permission) => permission.roleName === role)
        )
    )
  }
}

export const canUpdate = (
  metadata: Metadata,
  role: string,
  fieldName?: string
): boolean => {
  // * PostgreSQL views cannot be edited (as of now)
  if (metadata.view) return false
  if (role === ADMIN_ROLE) return true
  // ? Check the hasura permission rule ?
  if (fieldName) {
    const relationship = metadata.properties.get(fieldName)?.relationship
    if (relationship) {
      // * Relationship
      if (relationship?.type === 'object') {
        // * object relationship: check permission to update every foreign key column
        return relationship.mapping
          .map((m) => m.column?.name)
          .every((column) => column && canUpdate(metadata, role, column))
      } else {
        // * array relationship: check permission to update the foreign key columns
        const refMetadata = getMetadataTable(relationship.remoteTableId)
        return !!relationship?.mapping.every((m) =>
          canUpdate(refMetadata, role, m.remoteColumnName)
        )
      }
    } else {
      // * Column
      return metadata.columns.some(
        (col) =>
          col.name === fieldName &&
          col.canUpdate.some((permission) => permission.roleName === role)
      )
    }
  } else {
    return metadata.columns
      .filter(({ name }) => !SYSTEM_COLUMNS.includes(name))
      .some((col) =>
        col.canUpdate.some((permission) => permission.roleName === role)
      )
  }
}

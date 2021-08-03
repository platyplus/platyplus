import { Metadata, metadataStore } from '../../metadata'
import { Contents } from '../../types'

export const canEdit = (
  metadata: Metadata,
  role: string,
  document: Contents,
  propertyName?: string
) =>
  document._isTemporary
    ? canCreate(metadata, role, propertyName)
    : canUpdate(metadata, role, propertyName)

export const canSave = () => {
  // ? validate data ?
  // * check hasura permissions
  // * check SQL constraints
  return true
}

export const canDelete = (metadata: Metadata, role: string, doc: Contents) =>
  canEdit(metadata, role, doc, 'deleted')

export const canCreate = (
  metadata: Metadata,
  role: string,
  fieldName?: string
) => {
  // * PostgreSQL views cannot be edited (as of now)
  if (metadata.view) return false
  if (role === 'admin') return true
  // ? Check the hasura permission rule ?
  if (fieldName) {
    const property = metadata.properties.get(fieldName)
    const relationship = property.relationship
    if (relationship) {
      if (relationship.type === 'object') {
        // * object relationship: check permission to insert every foreign key column
        return relationship.mapping
          .map((m) => m.column?.name)
          .every((column) => column && canCreate(metadata, role, column))
      } else {
        // * array relationship: check permission to update the foreign key columns
        const refMetadata =
          metadataStore.getState().tables[relationship.remoteTable.id]
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
    return metadata.columns.some((col) =>
      col.canInsert.some((permission) => permission.roleName === role)
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
  if (role === 'admin') return true
  // ? Check the hasura permission rule ?
  if (fieldName) {
    const property = metadata.properties.get(fieldName)
    const relationship = property.relationship
    if (relationship) {
      // * Relationship
      if (relationship?.type === 'object') {
        // * object relationship: check permission to update every foreign key column
        return relationship.mapping
          .map((m) => m.column?.name)
          .every((column) => column && canUpdate(metadata, role, column))
      } else {
        // * array relationship: check permission to update the foreign key columns
        const refMetadata =
          metadataStore.getState().tables[relationship.remoteTable.id]
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
    return metadata.columns.some((col) =>
      col.canUpdate.some((permission) => permission.roleName === role)
    )
  }
}

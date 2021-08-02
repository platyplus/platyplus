import { getCollectionMetadata, Metadata } from '../../metadata'
import { ContentsCollection, Contents } from '../../types'

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
  // TODO
  return true
  /*
  if (fieldName) {
    const property = collection.schema.jsonSchema.properties[fieldName]
    if (property?.ref) {
      // * Relationship
      const relationship = metadata.relationships.find(
        ({ name }) => name === fieldName
      )
      if (relationship?.type === 'object') {
        // * object relationship: check permission to insert every foreign key column
        return relationship.mapping
          .map((m) => m.column?.name)
          .every((column) => column && canCreate(metadata, role, column))
      } else {
        // * array relationship: check permission to update the foreign key columns
        const refCollectionName =
          collection.schema.jsonSchema.properties[relationship?.name].ref
        const refCollection = collection.database[refCollectionName]
        return !!relationship?.mapping.every((m) =>
          canUpdate(refCollection, m.remoteColumnName)
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
  */
}

export const canUpdate = (
  metadata: Metadata,
  role: string,
  fieldName?: string
): boolean => {
  // * PostgreSQL views cannot be edited (as of now)
  if (metadata.view) return false
  if (role === 'admin') return true
  return true
  // TODO
  // ? Check the hasura permission rule ?
  /*
  if (fieldName) {
    const property = collection.schema.jsonSchema.properties[fieldName]
    if (property?.ref) {
      // * Relationship
      const relationship = metadata.relationships.find(
        ({ name }) => name === fieldName
      )
      if (relationship?.type === 'object') {
        // * object relationship: check permission to update every foreign key column
        return relationship.mapping
          .map((m) => m.column?.name)
          .every((column) => column && canUpdate(collection, column))
      } else {
        // * array relationship: check permission to update the foreign key columns
        const refCollection =
          collection.database.collections[
            collection.schema.jsonSchema.properties[relationship?.name].ref
          ]
        return !!relationship?.mapping.every((m) =>
          refCollection.canUpdate(m.remoteColumnName)
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
  */
}

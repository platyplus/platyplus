import { ContentsCollection, ContentsDocument } from '../../types'

export const canEdit = (document: ContentsDocument, propertyName?: string) =>
  document._isTemporary
    ? canCreate(document.collection, propertyName)
    : canUpdate(document.collection, propertyName)

export const canSave = () => {
  // ? validate data ?
  // * check hasura permissions
  // * check SQL constraints
  return true
}

export const canDelete = (doc: ContentsDocument) => canEdit(doc, 'deleted')

export const canCreate = (
  collection: ContentsCollection,
  fieldName?: string
) => {
  // * PostgreSQL views cannot be edited (as of now)
  if (collection.metadata.view) return false
  if (collection.role === 'admin') return true
  // ? Check the hasura permission rule ?
  if (fieldName) {
    const property = collection.schema.jsonSchema.properties[fieldName]
    if (property?.ref) {
      // * Relationship
      const relationship = collection.metadata.relationships.find(
        ({ rel_name }) => rel_name === fieldName
      )
      if (relationship?.rel_type === 'object') {
        // * object relationship: check permission to insert every foreign key column
        return relationship.mapping
          .map((m) => m.column?.name)
          .every((column) => column && canCreate(collection, column))
      } else {
        // * array relationship: check permission to update the foreign key columns
        const refCollectionName =
          collection.schema.jsonSchema.properties[relationship?.rel_name].ref
        const refCollection = collection.database[refCollectionName]
        return !!relationship?.mapping.every((m) =>
          canUpdate(refCollection, m.remoteColumnName)
        )
      }
    } else {
      // * Column
      const column = collection.metadata.columns.find(
        (col) => col.name === fieldName
      )
      return !!column?.canInsert.length
    }
  } else {
    return !!collection.metadata.canInsert_aggregate.aggregate?.count
  }
}

export const canUpdate = (
  collection: ContentsCollection,
  fieldName?: string
): boolean => {
  // * PostgreSQL views cannot be edited (as of now)
  if (collection.metadata.view) return false
  if (collection.role === 'admin') return true
  // ? Check the hasura permission rule ?
  if (fieldName) {
    const property = collection.schema.jsonSchema.properties[fieldName]
    if (property?.ref) {
      // * Relationship
      const relationship = collection.metadata.relationships.find(
        ({ rel_name }) => rel_name === fieldName
      )
      if (relationship?.rel_type === 'object') {
        // * object relationship: check permission to update every foreign key column
        return relationship.mapping
          .map((m) => m.column?.name)
          .every((column) => column && canUpdate(collection, column))
      } else {
        // * array relationship: check permission to update the foreign key columns
        const refCollection =
          collection.database.collections[
            collection.schema.jsonSchema.properties[relationship?.rel_name].ref
          ]
        return !!relationship?.mapping.every((m) =>
          refCollection.canUpdate(m.remoteColumnName)
        )
      }
    } else {
      // * Column
      const column = collection.metadata.columns.find(
        (col) => col.name === fieldName
      )
      return !!column?.canUpdate.length
    }
  } else {
    return !!collection.metadata.canUpdate_aggregate.aggregate?.count
  }
}

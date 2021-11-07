import { ADMIN_ROLE } from '../../constants'
import { TableInformation } from '../../metadata'
import { Contents } from '../../types'
import { DELETED_COLUMN } from '../columns'
import { tablePropertiesNames } from '../properties'
import {
  findRelationship,
  isManyToManyJoinTable,
  relationshipMapping,
  relationshipTable
} from '../relationships'
import { isRequiredProperty } from '../required'
export * from './properties'

export const canRead = (
  tableInfo: TableInformation,
  role: string,
  propertyName?: string
) => {
  const permissions = tableInfo.metadata?.select_permissions?.find(
    (p) => p.role === role
  )?.permission
  if (!permissions) return false

  if (propertyName) {
    const column = tableInfo.columns?.find((c) => c.name === propertyName)
    if (column) {
      return permissions.columns.includes(propertyName)
    } else {
      const relationship = findRelationship(tableInfo, propertyName)
      if (relationship) {
        const mapping = Object.keys(
          relationshipMapping(tableInfo, relationship)
        )
        return mapping.every((col) => permissions.columns.includes(col))
      }
    }
  } else {
    return (
      !isManyToManyJoinTable(tableInfo) &&
      tablePropertiesNames(tableInfo).some((name) =>
        canRead(tableInfo, role, name)
      )
    )
  }
}

export const canEdit = (
  tableInfo: TableInformation,
  role: string,
  document?: Contents,
  propertyName?: string
) =>
  !document || document._isTemporary
    ? canCreate(tableInfo, role, propertyName)
    : canUpdate(tableInfo, role, propertyName)

// TODO code redondant avec la validation depuis un modèle -> déplacer la logique dans dans model.ts
/*
export const canSave = (
  tableInfo: TableInformation,
  role: string,
  document?: Contents,
  propertyName?: string
) => {
  // TODO implement canSave correctly
  // * Return errors by field?
  // * validate data
  // * check hasura permissions
  // * check SQL constraints
  if (!document) return false
  if (propertyName) {
    const relationship = findRelationship(tableInfo, propertyName)
    if (!document[propertyName]) {
      if (relationship) {
        if (isRequiredRelationship(tableInfo, relationship)) return false
      } else {
        if (isRequiredColumn(tableInfo, getColumn(tableInfo, propertyName)))
          return false
      }
    }
    // ? return canEdit(tableInfo, role, document, propertyName)
  } else {
    return (
      !isManyToManyJoinTable(tableInfo) &&
      tablePropertiesNames(tableInfo).every((name) =>
        canSave(tableInfo, role, document, name)
      )
    )
  }
}
*/

export const canRemove = (
  tableInfo: TableInformation,
  role: string,
  doc?: Contents
) => canUpdate(tableInfo, role, DELETED_COLUMN)

export const canCreate = (
  tableInfo: TableInformation,
  role: string,
  fieldName?: string
) => {
  // * PostgreSQL views cannot be edited (as of now)
  // if (tableInfo.view) return false
  if (role === ADMIN_ROLE) return true
  const permissions = tableInfo.metadata.insert_permissions?.find(
    (p) => p.role === role
  )?.permission
  if (!permissions) return false
  // ? Check the hasura permission rule ?
  if (fieldName) {
    const relationship = findRelationship(tableInfo, fieldName)
    if (relationship) {
      const mapping = relationshipMapping(tableInfo, relationship)
      if (relationship.type === 'object') {
        // * object relationship: check permission to insert every foreign key column
        return Object.keys(mapping).every(
          (column) => column && canCreate(tableInfo, role, column)
        )
      } else {
        // * array relationship: check permission to update the foreign key columns
        const refTable = relationshipTable(tableInfo, relationship)
        return Object.values(mapping).every((col) => canUpdate(refTable, col))
      }
    } else {
      // * Column
      return permissions.columns.includes(fieldName)
    }
  } else {
    // * Must have at least one insertable user-defined column, and id must be insertable as well
    // TODO 'deleted' must have a default value
    return tablePropertiesNames(tableInfo).every(
      (name) =>
        canCreate(tableInfo, role, name) || !isRequiredProperty(tableInfo, name)
    )
  }
}

export const canUpdate = (
  tableInfo: TableInformation,
  role: string,
  fieldName?: string
): boolean => {
  // * PostgreSQL views cannot be edited (as of now)
  // if (tableInfo.view) return false
  if (role === ADMIN_ROLE) return true
  const permissions = tableInfo.metadata.update_permissions?.find(
    (p) => p.role === role
  )?.permission
  if (!permissions) return false
  // ? Check the hasura permission rule ?
  if (fieldName) {
    const relationship = findRelationship(tableInfo, fieldName)
    if (relationship) {
      // * Relationship
      const mapping = relationshipMapping(tableInfo, relationship)
      if (relationship?.type === 'object') {
        // * object relationship: check permission to update every foreign key column
        return Object.keys(mapping).every((col) =>
          canUpdate(tableInfo, role, col)
        )
      } else {
        // * array relationship: check permission to update the foreign key columns
        const refTable = relationshipTable(tableInfo, relationship)
        return Object.values(mapping).every((col) => canUpdate(refTable, col))
      }
    } else {
      // * Column
      return permissions.columns.includes(fieldName)
    }
  } else {
    return tablePropertiesNames(tableInfo).every(
      (name) =>
        canUpdate(tableInfo, role, name) || !isRequiredProperty(tableInfo, name)
    )
    // tableInfo.columns
    // .filter(({ name }) => !SYSTEM_COLUMNS.includes(name))
    // .some(({ name }) => permissions.columns.includes(name))
  }
}

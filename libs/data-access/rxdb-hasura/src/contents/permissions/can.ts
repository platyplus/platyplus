import { ADMIN_ROLE, TableInformation } from '../../metadata'
import { Contents } from '../../types'
import { DELETED_COLUMN, SYSTEM_COLUMNS } from '../columns'
import { getIds } from '../ids'
import {
  allRelationships,
  isManyToManyJoinTable,
  relationshipMapping,
  relationshipTable
} from '../relationships'
export * from './properties'

export const canRead = (
  tableInfo: TableInformation,
  role: string,
  propertyName?: string
) => {
  const permissions = tableInfo.metadata.select_permissions?.find(
    (p) => p.role === role
  )?.permission
  if (!permissions) return false

  if (propertyName) {
    const property = tableInfo.properties.get(propertyName)
    if (property.column) {
      return permissions.columns.includes(propertyName)
    } else if (property.relationship) {
      const mapping = Object.keys(
        relationshipMapping(tableInfo, property.relationship)
      )

      return mapping.every((col) => permissions.columns.includes(col))
    }
  } else {
    return (
      !isManyToManyJoinTable(tableInfo) &&
      [...tableInfo.properties.keys()].some((name) =>
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

export const canSave = () => {
  // ? validate data ?
  // * check hasura permissions
  // * check SQL constraints
  return true
}

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
    const relationship = allRelationships(tableInfo).find(
      (rel) => rel.name === fieldName
    )
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
    const ids = getIds(tableInfo)
    // * Must have at least one insertable user-defined column, and id must be insertable as well
    return (
      tableInfo.columns
        .filter(({ name }) => !SYSTEM_COLUMNS.includes(name))
        .some(({ name }) => permissions.columns.includes(name)) &&
      tableInfo.columns
        .filter(({ name }) => ids.includes(name))
        .every(({ name }) => permissions.columns.includes(name))
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
    const relationship = allRelationships(tableInfo).find(
      (rel) => rel.name === fieldName
    )
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
    return tableInfo.columns
      .filter(({ name }) => !SYSTEM_COLUMNS.includes(name))
      .some(({ name }) => permissions.columns.includes(name))
  }
}

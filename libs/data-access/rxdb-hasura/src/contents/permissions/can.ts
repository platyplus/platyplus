import { ADMIN_ROLE } from '../../constants'
import { TableInformation } from '../../metadata'
import { Contents, ContentsDocument } from '../../types'

import { DELETED_COLUMN, SYSTEM_COLUMNS } from '../columns'
import { tablePropertiesNames } from '../properties'
import {
  findRelationship,
  foreignDocumentDependencies,
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
  if (role === ADMIN_ROLE) return true
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
  propertyName?: string,
  isNew?: boolean
) => {
  return role === ADMIN_ROLE ||
    // * Not ideal as it means 'updated_at' column should NEVER be created in the frontend
    // TODO code 'isNewDocument' that is valid both before saving and before first push replication
    document?._isTemporary ||
    isNew
    ? canCreate(tableInfo, role, propertyName)
    : canUpdate(tableInfo, role, propertyName, document)
}

export const canRemove = async (
  tableInfo: TableInformation,
  role: string,
  doc?: ContentsDocument
) => {
  if (role === ADMIN_ROLE) return true
  if (!canUpdate(tableInfo, role, DELETED_COLUMN)) return false
  if (doc) {
    for (const { key: fk, query } of foreignDocumentDependencies(doc)) {
      if (fk.delete_rule === 'NO ACTION' || fk.delete_rule === 'RESTRICT') {
        const docs = await query.exec()
        if (docs.length) return false
      }
    }
  }
  return true
}

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
  fieldName?: string,
  document?: Contents
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
    if (
      document &&
      isRequiredProperty(tableInfo, fieldName) &&
      !document[fieldName]
    )
      return false
    const relationship = findRelationship(tableInfo, fieldName)
    if (relationship) {
      // * Relationship
      const mapping = relationshipMapping(tableInfo, relationship)
      if (relationship?.type === 'object') {
        // * object relationship: check permission to update every foreign key column
        return Object.keys(mapping).every((col) =>
          canUpdate(tableInfo, role, col, document?.[fieldName])
        )
      } else {
        // * array relationship: check permission to update the foreign key columns
        const refTable = relationshipTable(tableInfo, relationship)
        if (isManyToManyJoinTable(refTable)) {
          return canCreate(refTable, role) || canRemove(tableInfo, role)
        } else
          return Object.values(mapping).every((col) =>
            canUpdate(refTable, role, col, document?.[fieldName])
          )
      }
    } else {
      // * Column
      return permissions.columns.includes(fieldName)
    }
  } else {
    return tablePropertiesNames(tableInfo)
      .filter((name) => !SYSTEM_COLUMNS.includes(name))
      .some((name) => canUpdate(tableInfo, role, name, document))
  }
}

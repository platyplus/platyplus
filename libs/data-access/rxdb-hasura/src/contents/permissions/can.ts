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

export const canEdit = async (
  tableInfo: TableInformation,
  role: string,
  document?: Contents,
  propertyName?: string,
  isNew?: boolean
): Promise<boolean> => {
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
  if (!(await canUpdate(tableInfo, role, DELETED_COLUMN))) return false
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

export const canCreate = async (
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
        for (const column of Object.keys(mapping)) {
          if (!(column && (await canCreate(tableInfo, role, column))))
            return false
        }
        return true
      } else {
        // * array relationship: check permission to update the foreign key columns
        const refTable = relationshipTable(tableInfo, relationship)
        if (isManyToManyJoinTable(refTable)) {
          return (
            (await canCreate(refTable, role)) ||
            (await canRemove(tableInfo, role))
          )
        } else {
          for (const column of Object.values(mapping)) {
            if (!(await canUpdate(refTable, role, column))) return false
          }
          return true
        }
      }
    } else {
      // * Column
      return permissions.columns.includes(fieldName)
    }
  } else {
    // * Must have at least one insertable user-defined column, and id must be insertable as well
    // TODO 'deleted' must have a default value
    for (const name of tablePropertiesNames(tableInfo)) {
      if (
        !(await canCreate(tableInfo, role, name)) &&
        isRequiredProperty(tableInfo, name)
      )
        return false
    }
    return true
  }
}

export const canUpdate = async (
  tableInfo: TableInformation,
  role: string,
  fieldName?: string,
  document?: Contents
): Promise<boolean> => {
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
        for (const column of Object.keys(mapping)) {
          if (!canUpdate(tableInfo, role, column, document?.[fieldName]))
            return false
        }
        return true
      } else {
        // * array relationship: check permission to update the foreign key columns
        const refTable = relationshipTable(tableInfo, relationship)
        if (isManyToManyJoinTable(refTable)) {
          return (
            (await canCreate(refTable, role)) ||
            (await canRemove(tableInfo, role))
          )
        } else {
          for (const column of Object.values(mapping)) {
            if (!canUpdate(refTable, role, column, document?.[fieldName]))
              return false
          }
          return true
        }
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

import type { XOR } from '@platyplus/ts-types'
type PrimaryKey = {
  constraint: string
  columns: string[]
}

type ForeignKey = {
  from: string
  to: string
  constraint: string
  mapping: Record<string, string>
}
export type Relationship = {
  name: string
  using: XOR<
    {
      foreign_key_constraint_on: string
    },
    {
      manual_configuration: {
        remote_table: {
          schema: string
          name: string
        }
        insertion_order: unknown
        column_mapping: Record<string, string>
      }
    }
  >
}

type Permission<T = Record<string, never>> = {
  role: string
  permission: {
    columns: string[]
    filter: Record<string, unknown>
  } & T
}
type InsertPermission = Permission<{
  backend_only: boolean
  check: Record<string, unknown> | null
}>
type UpdatePermission = Permission<{
  check: Record<string, unknown> | null
}>

type Metadata = {
  table: { name: string; schema: string }
  object_relationships?: Array<Relationship>
  array_relationships?: Array<Relationship>
  select_permissions?: Array<Permission>
  insert_permissions?: Array<InsertPermission>
  update_permissions?: Array<UpdatePermission>
}

export type Column = {
  name: string
  tableId: string
  default: string
  nullable: boolean
  position: number
  dataType: string
  udtName: string
  isGenerated: boolean
  numericPrecision: number | null
  generationExpression: string | null
  characterMaximumLength: number | null
}
export type TableInfo = {
  id: string
  updated_at: unknown
  metadata: Metadata
  primaryKey: PrimaryKey
  foreignKeys: Array<Omit<ForeignKey, 'from'>>
  dependentForeignKeys: Array<Omit<ForeignKey, 'to'>>
  columns: Array<Column>
}

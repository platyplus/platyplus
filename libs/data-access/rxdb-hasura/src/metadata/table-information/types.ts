import type { XOR } from '@platyplus/ts-types'
import { ReplicatedCollection } from '../utils/replication/types'
type PrimaryKey = {
  constraint: string
  columns: string[]
}

export type ForeignKey = {
  from: string
  to: string
  update_rule: 'CASCADE' | 'SET NULL' | 'SET DEFAULT' | 'RESTRICT' | 'NO ACTION'
  delete_rule: 'CASCADE' | 'SET NULL' | 'SET DEFAULT' | 'RESTRICT' | 'NO ACTION'
  constraint: string
  mapping: Record<string, string>
}
export type Relationship = {
  name: string
  type?: string
  using: XOR<
    {
      foreign_key_constraint_on:
        | string
        | {
            column: string
            table: {
              schema: string
              name: string
            }
          }
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
  object_relationships?: Relationship[]
  array_relationships?: Relationship[]
  select_permissions?: Permission[]
  insert_permissions?: InsertPermission[]
  update_permissions?: UpdatePermission[]
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

type Index = {
  name: string
  columns: string[]
}
export type TableInfo = {
  id: string
  updated_at: unknown
  metadata: Metadata
  primaryKey: PrimaryKey
  foreignKeys: Omit<ForeignKey, 'from'>[]
  dependentForeignKeys: Omit<ForeignKey, 'to'>[]
  columns: Column[]
  indexes: Index[]
}

export type TableInfoCollection = ReplicatedCollection<TableInfo>

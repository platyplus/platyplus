import { ColumnFragment, RemoteTableFragment } from '../../generated'
import { Metadata } from '../../types'
import { ArrayElement } from '../../utils'

export const getIds = (table: Metadata | RemoteTableFragment): string[] =>
  table.primaryKey?.columns.map(({ column_name }) => column_name) || ['id']

export const isIdColumn = (
  column: ArrayElement<Metadata['columns']> | ColumnFragment
): boolean =>
  !!('primaryKey' in column && column.primaryKey) || column.column_name === 'id'

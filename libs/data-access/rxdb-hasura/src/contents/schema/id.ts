import { ColumnFragment } from '../../generated'
import { Metadata } from '../../types'
import { ArrayElement } from '../../utils'

export const getId = (table: Metadata): string =>
  table.primaryKey?.columns[0].column_name || 'id'

export const isIdColumn = (
  column: ArrayElement<Metadata['columns']> | ColumnFragment
): boolean =>
  !!('primaryKey' in column && column.primaryKey) || column.column_name === 'id'

import { ColumnFragment, RemoteTableFragment } from '../../generated'
import { Metadata } from '../../metadata'
import { ArrayElement } from '../../utils'

export const getIds = (table: Metadata | RemoteTableFragment): string[] =>
  table.primaryKey?.columns.map(({ columnName }) => columnName) || ['id']

export const isIdColumn = (
  column: ArrayElement<Metadata['columns']> | ColumnFragment
): boolean =>
  !!('primaryKey' in column && column.primaryKey) || column.name === 'id'

import { ColumnFragment } from '../../generated'
import { Metadata } from '../../metadata'
import { Contents } from '../../types'
import { ArrayElement } from '../../utils'

export const getIds = (table: Metadata): string[] =>
  table.primaryKey?.columns.map(({ columnName }) => columnName) || ['id']

export const isIdColumn = (
  column: ArrayElement<Metadata['columns']> | ColumnFragment
): boolean =>
  !!('primaryKey' in column && column.primaryKey) || column.name === 'id'

export const composeId = (
  table: Metadata,
  data: Contents,
  separator = '|'
): string =>
  getIds(table)
    .map((key) => data[key])
    .join(separator)

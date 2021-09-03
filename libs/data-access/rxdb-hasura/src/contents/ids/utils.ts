import { CommonColumnFragment } from '../../generated'
import { Metadata } from '../../metadata'
import { Contents } from '../../types'
import { ArrayElement } from '../../utils'
export const ID_COLUMN = 'id'

export const getIds = (table: Metadata): string[] =>
  table.primaryKey?.columns.map(({ columnName }) => columnName) || [ID_COLUMN]

export const isIdColumn = (
  column: ArrayElement<Metadata['columns']> | CommonColumnFragment
): boolean =>
  !!('primaryKey' in column && column.primaryKey) || column.name === ID_COLUMN

export const composeId = (
  table: Metadata,
  data: Contents,
  separator = '|'
): string =>
  getIds(table)
    .map((key) => data[key])
    .join(separator)

export const decomposeId = (table: Metadata, id: string, separator = '|') => {
  const splitId = id.split(separator)
  return getIds(table).reduce((acc, col, index) => {
    acc[col] = splitId[index]
    return acc
  }, {})
}

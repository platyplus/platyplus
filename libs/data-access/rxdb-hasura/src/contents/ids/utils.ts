import { Column, TableInfo, Contents } from '../../types'
export const ID_COLUMN = 'id'

export const getIds = (table: Partial<TableInfo>): string[] =>
  table.primaryKey?.columns || [ID_COLUMN]

export const isIdColumn = (
  table: Partial<TableInfo>,
  column: Column
): boolean => getIds(table).includes(column.name)

export const composeId = (
  table: Partial<TableInfo>,
  data: Contents,
  separator = '|'
): string =>
  getIds(table)
    .map((key) => data[key])
    .join(separator)

export const decomposeId = (
  table: Partial<TableInfo>,
  id: string,
  separator = '|'
) => {
  const splitId = id.split(separator)
  return getIds(table).reduce((acc, col, index) => {
    acc[col] = splitId[index]
    return acc
  }, {})
}

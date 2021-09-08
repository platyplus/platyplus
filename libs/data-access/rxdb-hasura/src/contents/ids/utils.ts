import { TableInformation } from '../../metadata'
import { Column, Contents } from '../../types'
export const ID_COLUMN = 'id'

export const getIds = (table: TableInformation): string[] =>
  table.primaryKey?.columns || [ID_COLUMN]

export const isIdColumn = (table: TableInformation, column: Column): boolean =>
  getIds(table).includes(column.name)

export const composeId = (
  table: TableInformation,
  data: Contents,
  separator = '|'
): string =>
  getIds(table)
    .map((key) => data[key])
    .join(separator)

export const decomposeId = (
  table: TableInformation,
  id: string,
  separator = '|'
) => {
  const splitId = id.split(separator)
  return getIds(table).reduce((acc, col, index) => {
    acc[col] = splitId[index]
    return acc
  }, {})
}

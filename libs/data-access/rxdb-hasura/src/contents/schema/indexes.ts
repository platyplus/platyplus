import { TableInformation } from '../../metadata'
import { getColumn } from '../columns'
import { propertyJsonType } from '../properties'

// * PostgreSQL indexes + label
export const indexes = (table: TableInformation): (string | string[])[] => {
  // * Map PostgreSQL indexes
  // TODO revoir completement
  // ? automatically add [id, updated_at]? In any case:
  // TODO perf: either document or automate the creation of [updated_at] and [id, updated_at] (or [updated_at, id]?) indexes
  // ? automatically map foreign keys e.g. table.config.table_id -> index on table_id
  // TODO perf: either document or automate creation of indexes on foreign keys
  const postgresIndexes = table.indexes
    .filter(({ columns }) =>
      columns.every((name) => {
        const column = getColumn(table, name)
        const type = column && propertyJsonType(table, column)
        return (
          // TODO raise warning when postgresql index cannot be converted into an RxDB index
          typeof type === 'string' &&
          ['string', 'number', 'integer'].includes(type)
        )
      })
    )
    .map(({ columns }) => columns.map((columnName) => columnName))
  return [...postgresIndexes, 'label']

  return ['label']
}

import { TableInformation } from '../../metadata'

// * PostgreSQL indexes + label
export const indexes = (table: TableInformation): (string | string[])[] => {
  // TODO map foreign keys e.g. table.config.table_id -> index on table_id
  // * Map PostgreSQL indexes
  // TODO revoir completement
  /*
  const postgresIndexes = table.indexes
    .filter(({ columns }) =>
      columns.every(({ columnName }) => {
        const column = table.columns.find((c) => c.name === columnName)
        const type = column && propertyJsonType(column)
        return (
          // TODO raise warning when postgresql index cannot be converted into an RxDB index
          typeof type === 'string' &&
          ['string', 'number', 'integer'].includes(type)
        )
      })
    )
    .map(({ columns }) => columns.map(({ columnName }) => columnName))
  return [...postgresIndexes, 'label']
    */
  return ['label']
}

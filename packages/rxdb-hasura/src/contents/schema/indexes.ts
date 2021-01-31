import { Metadata } from '../../types'
import { propertyJsonType } from './property'

// * PostgreSQL indexes + label
export const indexes = (table: Metadata): (string | string[])[] => {
  // * Map PostgreSQL indexes
  const postgresIndexes = table.indexes
    .filter(({ columns }) =>
      columns.every(({ column_name }) => {
        const column = table.columns.find(c => c.column_name === column_name)
        const type = column && propertyJsonType(column)
        return (
          // TODO raise warning when postgresql index cannot be converted into an RxDB index
          typeof type === 'string' &&
          ['string', 'number', 'integer'].includes(type)
        )
      })
    )
    .map(({ columns }) =>
      columns.map(({ column_name }) => column_name as string)
    )
  return [...postgresIndexes, 'label']
}

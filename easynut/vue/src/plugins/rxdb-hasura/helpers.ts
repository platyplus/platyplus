import { TableFragment } from '../../generated'

export const fullTableName = (data: TableFragment): string =>
  data.table_schema === 'public'
    ? `${data.table_name}`
    : `${data.table_schema}_${data.table_name}`

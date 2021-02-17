import { ColumnFragment } from '../../generated'
import { Metadata } from '../../types'

export const getId = (table: Metadata): string =>
  table.primaryKey?.columns[0].column_name || 'id'

type ArrayElement<
  ArrayType extends readonly unknown[]
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export const isIdColumn = (
  column: ArrayElement<Metadata['columns']> | ColumnFragment
): boolean =>
  !!('primaryKey' in column && column.primaryKey) || column.column_name === 'id'

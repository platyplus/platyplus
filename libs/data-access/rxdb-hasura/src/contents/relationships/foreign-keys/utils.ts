import { Metadata } from '../../../types'

export const findForeignKeyConstraint = (
  table: Metadata,
  property: Metadata['relationships'][0]
): Metadata['foreignKeys'][0] | undefined => {
  return table.foreignKeys?.find((fk) =>
    (fk.columns as unknown as string[]).some((name) =>
      property.mapping.some((mapping) => mapping.column.name === name)
    )
  )
}

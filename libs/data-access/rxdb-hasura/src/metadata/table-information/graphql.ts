import gql from 'graphql-tag'

export const query = gql`
  query tableInfo($updated_at: timestamptz!, $batchSize: Int!) {
    platyplus_tables(
      where: { updated_at: { _gt: $updated_at } }
      limit: $batchSize
      order_by: [{ updated_at: asc }, { id: asc }]
    ) {
      id
      updated_at
      deleted
      metadata
      columns {
        name
        position
        default
        nullable
        dataType
        udtName
        characterMaximumLength
        numericPrecision
        isGenerated
        generationExpression
      }
      primaryKey {
        constraint
        columns
      }
      foreignKeys {
        to
        constraint
        update_rule
        delete_rule
        mapping
      }
      dependentForeignKeys {
        from
        constraint
        mapping
      }
      indexes {
        name
        columns
      }
    }
  }
`

export const subscription = gql`
  subscription onTableInfo($now: timestamptz!) {
    platyplus_tables(
      where: { updated_at: { _gt: $now } }
      order_by: { updated_at: asc }
    ) {
      updated_at
    }
  }
`

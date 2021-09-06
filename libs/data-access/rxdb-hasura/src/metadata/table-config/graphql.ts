import gql from 'graphql-tag'
export const query = gql`
  query tableConfig($updated_at: timestamptz!, $batchSize: Int!) {
    platyplus_table_config(
      where: { updated_at: { _gt: $updated_at } }
      limit: $batchSize
      order_by: [{ updated_at: asc }, { id: asc }]
    ) {
      id
      updated_at
      deleted
      component
      description
      document_label
      document_title
      icon
      order
      title
    }
  }
`
export const mutation = gql`
  mutation insertTableConfig(
    $objects: [platyplus_table_config_insert_input!]!
  ) {
    insert_platyplus_table_config(
      objects: $objects
      on_conflict: {
        constraint: table_config_pkey
        update_columns: [
          deleted
          component
          description
          document_label
          document_title
          icon
          order
          title
        ]
      }
    ) {
      returning {
        id
      }
    }
  }
`
export const subscription = gql`
  subscription onTableConfig($now: timestamptz!) {
    platyplus_table_config(
      where: { updated_at: { _gt: $now } }
      order_by: { updated_at: asc }
    ) {
      updated_at
    }
  }
`

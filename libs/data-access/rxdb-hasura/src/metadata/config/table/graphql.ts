import gql from 'graphql-tag'
export const query = gql`
  query tableConfig($updated_at: timestamptz!, $batchSize: Int!) {
    metadata_table_config(
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
  mutation insertMetadataTableConfig(
    $objects: [metadata_table_config_insert_input!]!
  ) {
    insert_metadata_table_config(
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
    metadata_table_config(
      where: { updated_at: { _gt: $now } }
      order_by: { updated_at: asc }
    ) {
      updated_at
    }
  }
`

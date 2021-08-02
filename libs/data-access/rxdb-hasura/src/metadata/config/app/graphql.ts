import gql from 'graphql-tag'
export const query = gql`
  query appConfig($updated_at: timestamptz!, $batchSize: Int!) {
    metadata_app_config(
      where: { updated_at: { _gt: $updated_at } }
      limit: $batchSize
      order_by: [{ updated_at: asc }, { id: asc }]
    ) {
      id
      updated_at
      menu_order
      deleted
    }
  }
`
export const mutation = gql`
  mutation insertMetadataAppConfig(
    $objects: [metadata_app_config_insert_input!]!
  ) {
    insert_metadata_app_config(
      objects: $objects
      on_conflict: {
        constraint: app_config_pkey
        update_columns: [deleted, menu_order]
      }
    ) {
      returning {
        id
      }
    }
  }
`
export const subscription = gql`
  subscription onAppConfig($now: timestamptz!) {
    metadata_app_config(
      where: { updated_at: { _gt: $now } }
      order_by: { updated_at: asc }
    ) {
      updated_at
    }
  }
`

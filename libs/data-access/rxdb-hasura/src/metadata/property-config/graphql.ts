import gql from 'graphql-tag'
export const query = gql`
  query propertyConfig($updated_at: timestamptz!, $batchSize: Int!) {
    platyplus_property_config(
      where: { updated_at: { _gt: $updated_at } }
      limit: $batchSize
      order_by: [{ updated_at: asc }, { id: asc }]
    ) {
      id
      updated_at
      table_id
      deleted
      property_name
      component
      json_schema
      icon
      description
      title
    }
  }
`
export const mutation = gql`
  mutation insertPropertyConfig(
    $objects: [platyplus_property_config_insert_input!]!
  ) {
    insert_platyplus_property_config(
      objects: $objects
      on_conflict: {
        constraint: property_config_pkey
        update_columns: [
          table_id
          deleted
          property_name
          component
          json_schema
          icon
          description
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
  subscription onPropertyConfig($now: timestamptz!) {
    platyplus_property_config(
      where: { updated_at: { _gt: $now } }
      order_by: { updated_at: asc }
    ) {
      updated_at
    }
  }
`

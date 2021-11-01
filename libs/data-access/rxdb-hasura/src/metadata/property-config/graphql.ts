import gql from 'graphql-tag'
import { PROPERTY_CONFIG_TABLE } from './constants'
export const query = gql`
  query propertyConfig($updated_at: timestamptz!, $batchSize: Int!) {
    ${PROPERTY_CONFIG_TABLE}(
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
    $objects: [${PROPERTY_CONFIG_TABLE}_insert_input!]!
  ) {
    insert_${PROPERTY_CONFIG_TABLE}(
      objects: $objects
      on_conflict: {
        constraint: ${PROPERTY_CONFIG_TABLE}_pkey
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
    ${PROPERTY_CONFIG_TABLE}(
      where: { updated_at: { _gt: $now } }
      order_by: { updated_at: asc }
    ) {
      updated_at
    }
  }
`

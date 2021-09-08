import gql from 'graphql-tag'
import { TABLE_CONFIG_TABLE } from '../../constants'
export const query = gql`
  query tableConfig($updated_at: timestamptz!, $batchSize: Int!) {
    platyplus_${TABLE_CONFIG_TABLE}(
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
      document_component
      icon
      order
      title
    }
  }
`
export const mutation = gql`
  mutation insertTableConfig(
    $objects: [platyplus_${TABLE_CONFIG_TABLE}_insert_input!]!
  ) {
    insert_platyplus_${TABLE_CONFIG_TABLE}(
      objects: $objects
      on_conflict: {
        constraint: ${TABLE_CONFIG_TABLE}_pkey
        update_columns: [
          deleted
          component
          description
          document_label
          document_title
          document_component
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
    platyplus_${TABLE_CONFIG_TABLE}(
      where: { updated_at: { _gt: $now } }
      order_by: { updated_at: asc }
    ) {
      updated_at
    }
  }
`

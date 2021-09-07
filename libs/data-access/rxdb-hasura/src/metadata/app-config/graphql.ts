import gql from 'graphql-tag'
import { APP_CONFIG_TABLE } from '../utils'
export const query = gql`
  query appConfig($updated_at: timestamptz!, $batchSize: Int!) {
    platyplus_${APP_CONFIG_TABLE}(
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
  mutation insertAppConfig($objects: [platyplus_${APP_CONFIG_TABLE}_insert_input!]!) {
    insert_platyplus_${APP_CONFIG_TABLE}(
      objects: $objects
      on_conflict: {
        constraint: ${APP_CONFIG_TABLE}_pkey
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
    platyplus_${APP_CONFIG_TABLE}(
      where: { updated_at: { _gt: $now } }
      order_by: { updated_at: asc }
    ) {
      updated_at
    }
  }
`

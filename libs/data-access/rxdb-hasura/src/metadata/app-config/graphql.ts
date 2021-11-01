import gql from 'graphql-tag'
import { APP_CONFIG_TABLE } from './constants'

export const query = gql`
  query appConfig($updated_at: timestamptz!, $batchSize: Int!) {
    ${APP_CONFIG_TABLE}(
      where: { updated_at: { _gt: $updated_at } }
      limit: $batchSize
      order_by: [{ updated_at: asc }, { id: asc }]
    ) {
      id
      updated_at
      menu
      deleted
      home
    }
  }
`
export const mutation = gql`
  mutation insertAppConfig($objects: [${APP_CONFIG_TABLE}_insert_input!]!) {
    insert_${APP_CONFIG_TABLE}(
      objects: $objects
      on_conflict: {
        constraint: ${APP_CONFIG_TABLE}_pkey
        update_columns: [deleted, menu, home]
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
    ${APP_CONFIG_TABLE}(
      where: { updated_at: { _gt: $now } }
      order_by: { updated_at: asc }
    ) {
      updated_at
    }
  }
`

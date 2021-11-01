import gql from 'graphql-tag'
import { PAGES_TABLE } from './constants'
export const query = gql`
  query pages($updated_at: timestamptz!, $batchSize: Int!) {
    ${PAGES_TABLE}(
      where: { updated_at: { _gt: $updated_at } }
      limit: $batchSize
      order_by: [{ updated_at: asc }, { id: asc }]
    ) {
      id
      updated_at
      deleted
      slug
      contents
      title
      icon
    }
  }
`
export const mutation = gql`
  mutation insertPage(
    $objects: [${PAGES_TABLE}_insert_input!]!
  ) {
    insert_${PAGES_TABLE}(
      objects: $objects
      on_conflict: {
        constraint: ${PAGES_TABLE}_pkey
        update_columns: [
          slug
          contents
          title
          icon
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
  subscription onPage($now: timestamptz!) {
    ${PAGES_TABLE}(
      where: { updated_at: { _gt: $now } }
      order_by: { updated_at: asc }
    ) {
      updated_at
    }
  }
`

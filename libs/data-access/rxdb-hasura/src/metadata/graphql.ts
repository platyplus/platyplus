import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import { queryToSubscription } from '../utils'
export const query = gql`
  fragment coreTable on metadata_table {
    id
    table_name
    table_schema
  }

  fragment column on metadata_column_info {
    column_name
    udt_name
    is_nullable
  }

  fragment table on metadata_table {
    ...coreTable
    view {
      id
    }
    primaryKey {
      constraint_name
      columns {
        column_name
      }
    }
    indexes {
      index_name
      columns {
        column_name
      }
    }
    config {
      title
      description
      icon
      document_title
      document_label
      component
    }
    propertiesConfig {
      property_name
      title
      description
      icon
      component
      json_schema
    }
    computedProperties {
      name
      type
      nullable
      transformation
      template
    }
    canSelect_aggregate {
      aggregate {
        count
      }
    }
    canInsert_aggregate {
      aggregate {
        count
      }
    }
    canUpdate_aggregate {
      aggregate {
        count
      }
    }
    relationships(
      where: {
        mapping: {
          remoteTable: {
            _and: [
              { columns: { column_name: { _eq: "id" } } }
              { columns: { column_name: { _eq: "updated_at" } } }
              { columns: { column_name: { _eq: "deleted" } } }
            ]
          }
        }
      }
    ) {
      rel_name
      rel_type
      mapping {
        column {
          ...column
        }
        remoteTable {
          ...coreTable
        }
        remote_column_name
      }
    }
    columns {
      ...column
      primaryKey {
        constraint_name
      }
      canSelect {
        role_name
      }
      canInsert {
        role_name
      }
      canUpdate {
        role_name
      }
      config {
        json_schema
      }
    }
  }

  query metadata {
    metadata_table(
      where: {
        _and: [
          { columns: { column_name: { _eq: "updated_at" } } }
          { columns: { column_name: { _eq: "id" } } }
          { columns: { column_name: { _eq: "deleted" } } }
        ]
      }
    ) {
      ...table
    }
  }
`

export const stringQuery = print(query)

export const subscription = queryToSubscription(query)
export const stringSubscription = print(subscription)

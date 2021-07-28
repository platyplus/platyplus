import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import { queryToSubscription } from '../utils'

// TODO use table.primaryKey instead of table.columns.primaryKey
export const query = gql`
  fragment coreTable on metadata_table {
    id
    table_name
    table_schema
    primaryKey {
      constraint_name
      columns {
        columnName
      }
    }
  }

  fragment remoteTable on metadata_table {
    ...coreTable
    relationships {
      rel_type
      remoteTable {
        ...coreTable
      }
    }
    columns {
      name
    }
  }

  fragment column on metadata_column_info {
    name
    udtName
    isNullable
    default
  }

  fragment table on metadata_table {
    ...coreTable
    view {
      id
    }

    indexes {
      name
      columns {
        columnName
      }
    }
    config {
      document_label
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
              # { columns: { name: { _eq: "id" } } }
              { columns: { name: { _eq: "updated_at" } } }
              { columns: { name: { _eq: "deleted" } } }
            ]
          }
        }
      }
    ) {
      rel_name
      rel_type
      remoteTable {
        ...remoteTable
      }
      mapping {
        column {
          ...column
        }
        remoteColumnName
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
    }
  }

  query metadata {
    metadata_table(
      where: {
        _and: [
          { columns: { name: { _eq: "updated_at" } } }
          { columns: { name: { _eq: "deleted" } } }
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

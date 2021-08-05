import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import { queryToSubscription } from '../../utils'

// TODO use table.primaryKey instead of table.columns.primaryKey
export const query = gql`
  fragment coreTable on metadata_table {
    id
    name
    schema
    primaryKey {
      constraintName
      columns {
        columnName
      }
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
    dependentForeignKeys {
      tableId
      onDelete
      onUpdate
      columns
    }
    foreignKeys {
      refId
      columns
    }
    indexes {
      name
      columns {
        columnName
      }
    }
    computedProperties {
      name
      type
      nullable
      transformation
      template
    }
    relationships {
      name
      type
      remoteTableId
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
        constraintName
      }
      canSelect {
        roleName
      }
      canInsert {
        roleName
      }
      canUpdate {
        roleName
      }
    }
  }

  query metadata {
    metadata_table {
      ...table
    }
  }
`

export const stringQuery = print(query)

export const subscription = queryToSubscription(query)
export const stringSubscription = print(subscription)

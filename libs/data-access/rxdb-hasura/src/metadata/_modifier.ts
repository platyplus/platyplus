// ! Not in use yet: consider modifying the 'table' graphql request before using it in RxDB
// ! (requires a lot of refactoring...)
import { TableFragment } from '../generated'

type PropertyName = string
type Index = PropertyName | PropertyName[]

type Permission = boolean
type Permissions = Record<'select' | 'update' | 'insert', Permission>
export type Property = {
  can: Permissions
  component?: string
  title?: string
  icon?: string
  description?: string
  json_schema?: Record<string, unknown>

  // TODO column
  required: boolean // nullable
  primary: boolean // ? redundant
  udt_name?: string // TODO

  relationship?: {
    // ? redundant
    type: 'object' | 'array'
    mapping: {
      from: PropertyName
      to: PropertyName
    }[]
    remote: {
      table: string
      field?: string
    }
  }

  computed?: {
    //? redundant
    tranformation?: string
    template?: string
  }
}

export type NewMetadata = {
  id: string // role_tableName or role_tableSchema_tableName when schema is not 'public'
  table: {
    id: string
    schema: string
    name: string
  }

  view: boolean
  component?: string
  title?: string
  icon?: string
  description?: string
  document?: {
    title?: string
    label?: string
  }

  properties: Record<PropertyName, Property>
  can: Permissions

  indexes: Index[]
  // ? redundant information?
  columns: PropertyName[]
  primaryColumns: PropertyName[]
  computed: PropertyName[]
  relationships: PropertyName[]
  order: PropertyName[]
}

export const modifier = (doc: TableFragment, role: string): NewMetadata => {
  const name =
    doc.table_schema === 'public'
      ? doc.table_name
      : `${doc.table_schema}_${doc.table_name}`

  const relationshipProperties = doc.relationships.reduce<
    Record<string, Property>
  >((aggr, rel) => {
    const remoteTable = rel.mapping[0].remoteTable
    const result: Property = {
      required: false, // ? true if the corresponding FK is r
      primary: false, // ? unless in the m2m join?
      can: {
        // ? infer from corresponding FK?
        select: true,
        insert: true,
        update: true
      },
      relationship: {
        type: rel.rel_type as 'object' | 'array',
        // TODO
        mapping: [],
        remote: {
          table: `${remoteTable.table_schema}.${remoteTable.table_name}`,
          field: null // TODO 'reverse' property
        }
      }
    }
    aggr[rel.rel_name] = result
    return aggr
  }, {})

  // TODO filter out primary keys, foreign keys and relationship mappings
  const columnProperties = doc.columns.reduce<Record<string, Property>>(
    (aggr, column) => {
      aggr[column.column_name] = {
        can: {
          select: column.canSelect.some(
            (permission) => permission.role_name === role
          ),
          insert: column.canInsert.some(
            (permission) => permission.role_name === role
          ),
          update: column.canUpdate.some(
            (permission) => permission.role_name === role
          )
        },
        primary: !!column.primaryKey?.constraint_name,
        required: !column.is_nullable,
        udt_name: column.udt_name
      }
      return aggr
    },
    {}
  )

  const properties = { ...columnProperties, ...relationshipProperties }
  // TODO loop into property config and update the 'properties' object
  //   component: ''
  //   title: ''
  // description: '',
  // icon: '',
  // json_schema: '',
  return {
    id: `${role}_${name}`,
    table: {
      id: `${doc.table_schema}.${doc.table_name}`,
      schema: doc.table_schema,
      name: doc.table_name
    },
    view: !!doc.view.id,
    component: doc.config.component,
    title: doc.config.title || name,
    icon: doc.config.icon,
    description: doc.config.description,
    document: {
      title: doc.config.document_title,
      label: doc.config.document_label
    },
    can: {
      select: !!doc.canSelect_aggregate.aggregate.count,
      insert: !!doc.canInsert_aggregate.aggregate.count,
      update: !!doc.canUpdate_aggregate.aggregate.count
    },
    indexes: doc.indexes.map(({ columns }) =>
      columns.map(({ column_name }) => column_name)
    ),

    // TODO

    properties,
    columns: doc.columns.map((col) => col.column_name),
    primaryColumns: [],
    computed: [],
    relationships: [],
    order: []
  }
}

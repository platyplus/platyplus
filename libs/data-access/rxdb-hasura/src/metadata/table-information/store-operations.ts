import { TableInformation } from '@platyplus/rxdb-hasura'
import produce from 'immer'

import {
  columnProperties,
  isRequiredColumn,
  isRequiredRelationship
} from '../../contents'
import { TableInfoStore, tableInfoStore } from '../../store'

import { PropertyType } from '../types'
import { TableInfo } from './types'

const typesMapping: Record<string, PropertyType> = {
  uuid: 'string',
  bool: 'boolean',
  timestamp: 'date-time',
  timestamptz: 'date-time',
  date: 'date',
  timetz: 'time',
  time: 'time',
  text: 'string',
  citext: 'string',
  varchar: 'string',
  jsonb: 'json',
  numeric: 'number',
  int: 'integer',
  int4: 'integer',
  int8: 'integer',
  float4: 'number',
  name: 'string',
  bigint: 'integer',
  real: 'number',
  decimal: 'number'
}

const setTableInfo = (table: TableInfo) =>
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
      const previousTable = state.tables[table.id]
      const nextTable = {
        ...(previousTable || {}),
        ...table
      } as TableInformation
      if (!nextTable.properties) nextTable.properties = new Map()
      if (previousTable) {
        if (previousTable.columns) {
          // * Remove previous columns that are not part of the schema anymore
          columnProperties(previousTable).forEach((col) => {
            if (!table.columns[col.name]) nextTable.properties.delete(col.name)
          })
        }
        if (previousTable.metadata?.object_relationships) {
          // * Remove previous relationships that are not part of the schema anymore
          previousTable.metadata.object_relationships.forEach((rel) => {
            if (
              !table.metadata.object_relationships?.find(
                ({ name }) => name === rel.name
              ) &&
              !table.metadata.array_relationships?.find(
                ({ name }) => name === rel.name
              )
            )
              nextTable.properties.delete(rel.name)
          })
        }
        if (previousTable.metadata?.array_relationships) {
          // * Remove previous relationships that are not part of the schema anymore
          previousTable.metadata.array_relationships.forEach((rel) => {
            if (
              !table.metadata.object_relationships?.find(
                ({ name }) => name === rel.name
              ) &&
              !table.metadata.array_relationships?.find(
                ({ name }) => name === rel.name
              )
            )
              nextTable.properties.delete(rel.name)
          })
        }
      }
      columnProperties(nextTable).forEach((col) => {
        nextTable.properties.set(col.name, {
          name: col.name,
          config: nextTable.properties.get(col.name)?.config,
          column: col,
          type: typesMapping[col.udtName],
          required: isRequiredColumn(table, col),
          primary: nextTable.primaryKey.columns.includes(col.name)
        })
      })

      nextTable.metadata.array_relationships?.forEach((rel) => {
        nextTable.properties.set(rel.name, {
          name: rel.name,
          config: nextTable.properties.get(rel.name)?.config,
          relationship: rel,
          type: 'collection',
          required: isRequiredRelationship(table, rel),
          primary: false
        })
      })
      nextTable.metadata.object_relationships?.forEach((rel) => {
        nextTable.properties.set(rel.name, {
          name: rel.name,
          config: nextTable.properties.get(rel.name)?.config,
          relationship: rel,
          type: 'object',
          required: isRequiredRelationship(table, rel),
          primary: false
        })
      })
      state.tables[table.id] = nextTable
    })
  )

export const onUpsert = (doc: TableInfo) => {
  setTableInfo(doc)
}

export const onDelete = (doc: TableInfo) => {
  console.log('TODO onDelete')
}

// * When receiving changes in the websocket, check if some of the tables have been removed.
// * If so, remove them from the store
// * A store subscription will then trigger the removal of the corresponding RxDB collections
export const onWsReceive = (data: TableInfo[]) => {
  tableInfoStore.setState(
    produce<TableInfoStore>((state) => {
      Object.keys(tableInfoStore.getState().tables).forEach((id) => {
        if (!data.find((table) => table.id === id)) delete state.tables[id]
      })
    })
  )
}

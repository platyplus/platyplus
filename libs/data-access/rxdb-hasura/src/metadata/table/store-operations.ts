import produce from 'immer'
import { DeepReadonly } from 'rxdb/dist/types/types'

import {
  columnProperties,
  isRequiredColumn,
  isRequiredRelationship
} from '../../contents'
import { TableFragment } from '../../generated'
import { MetadataStore, metadataStore } from '../../store'

import { Metadata, Property, PropertyType } from '../types'

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

export const setMetadataTable = (table: TableFragment) =>
  metadataStore.setState(
    produce<MetadataStore>((state) => {
      const previousTable = state.tables[table.id]
      const nextTable = {
        ...(previousTable || {}),
        ...table
      } as unknown as Metadata
      if (!nextTable.properties) nextTable.properties = new Map()
      if (previousTable) {
        if (previousTable.columns) {
          // * Remove previous columns that are not part of the schema anymore
          columnProperties(previousTable).forEach((col) => {
            if (!table.columns.find(({ name }) => name === col.name))
              nextTable.properties.delete(col.name)
          })
        }
        if (previousTable.relationships) {
          // * Remove previous relationships that are not part of the schema anymore
          previousTable.relationships
            .filter((rel) => rel.remoteTableId)
            .forEach((rel) => {
              if (!table.relationships.find(({ name }) => name === rel.name))
                nextTable.properties.delete(rel.name)
            })
        }
      }

      columnProperties(nextTable).forEach((col) => {
        const isPrimary = nextTable.primaryKey.columns
          .map((c) => c.columnName)
          .includes(col.name)

        const property: Property = {
          name: col.name,
          ...(nextTable.properties.get(col.name) || {}),
          column: col,
          type: typesMapping[col.udtName],
          required: isRequiredColumn(col),
          primary: isPrimary
        }
        nextTable.properties.set(col.name, property)
      })
      nextTable.relationships
        .filter((rel) => rel.remoteTableId)
        .forEach((rel) => {
          const property: Property = {
            name: rel.name,
            ...(nextTable.properties.get(rel.name) || {}),
            relationship: rel,
            type: rel.type === 'object' ? 'document' : 'collection',
            required: isRequiredRelationship(rel),
            primary: false
          }
          nextTable.properties.set(rel.name, property)
        })
      state.tables[table.id] = nextTable
    })
  )

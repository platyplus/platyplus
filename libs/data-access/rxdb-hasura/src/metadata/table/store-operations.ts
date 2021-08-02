import produce from 'immer'
import { DeepReadonly } from 'rxdb/dist/types/types'
import {
  columnProperties,
  isManyToManyTable,
  isRequiredColumn,
  isRequiredRelationship
} from '../../contents'

import { TableFragment } from '../../generated'
import { metadataStore } from '../store'
import { Metadata, Property, PropertyType } from '../types'

const typesMapping: Record<string, PropertyType> = {
  // TODO complete e.g. GIS
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

export const setMetadataTable = (
  table: TableFragment | DeepReadonly<TableFragment>
) =>
  metadataStore.setState(
    produce((state) => {
      const metadata: Metadata = { ...(state.tables[table.id] || {}), ...table }
      if (!metadata.properties) metadata.properties = new Map()
      columnProperties(metadata).forEach((col) => {
        const isPrimary = metadata.primaryKey.columns
          .map((c) => c.columnName)
          .includes(col.name)

        const property: Property = {
          name: col.name,
          ...(metadata.properties.get(col.name) || {}),
          column: col,
          type: typesMapping[col.udtName],
          required: isRequiredColumn(col),
          primary: isPrimary
        }
        metadata.properties.set(col.name, property)
      })
      metadata?.relationships
        .filter((rel) => rel.remoteTable)
        .forEach((rel) => {
          const property: Property = {
            name: rel.name,
            ...(metadata.properties.get(rel.name) || {}),
            relationship: {
              ...rel,
              ref: isManyToManyTable(rel.remoteTable)
                ? rel.remoteTable.relationships.find(
                    (rel) => rel.remoteTable.id !== metadata.id
                  ).remoteTable.id
                : rel.remoteTable.id
            },
            type: rel.type === 'object' ? 'document' : 'collection',
            required: isRequiredRelationship(rel),
            primary: false
          }
          metadata.properties.set(rel.name, property)
        })
      state.tables[table.id] = metadata
    })
  )

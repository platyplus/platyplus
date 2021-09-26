import { jsonataPaths } from '@platyplus/jsonata-schema'
import { ContentsCollection } from '../types'
import { FieldMap } from './types'

// * Generate query fields according to the loaded schema
// * It is meant to:
// * - avoid sending the details of GraphQL JSON fields
// * - systematically add default fields of properties (primary key and `deleted`)
const generateRxdbJsonataPaths = (
  schema: FieldMap,
  collection?: ContentsCollection
): FieldMap => {
  const subFields = Object.entries(schema).reduce<FieldMap>(
    (aggr, [key, value]) => {
      const ref = collection?.schema.jsonSchema.properties[key].ref
      if (collection && ref) {
        if (value === true) {
          aggr[key] = { [collection.schema.primaryPath]: true, deleted: true }
        } else
          aggr[key] = generateRxdbJsonataPaths(
            value,
            collection?.database[ref] as ContentsCollection
          )
      } else aggr[key] = true

      return aggr
    },
    {}
  )
  return subFields
}

export const rxdbJsonataPaths = (
  expression: string,
  collection: ContentsCollection
): FieldMap => generateRxdbJsonataPaths(jsonataPaths(expression), collection)

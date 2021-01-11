import { ContentsCollection, ContentsCollectionMethods } from '../types'
const config = (collection: ContentsCollection, property?: string) =>
  property
    ? collection.metadata.columns.find(
        ({ column_name }) => column_name === property
      )?.config ||
      collection.metadata.relationships.find(rel => rel.rel_name === property)
        ?.config
    : collection.metadata.config
export const collectionMethods: ContentsCollectionMethods = {
  canInsert(this: ContentsCollection, fieldName?: string): boolean {
    // ? Check the hasura permission rule ?
    if (fieldName) {
      const property = this.schema.jsonSchema.properties[fieldName]
      if (property?.ref) {
        // * Relationship
        const relationship = this.metadata.relationships.find(
          ({ rel_name }) => rel_name === fieldName
        )
        if (relationship?.rel_type === 'object') {
          // * object relationship
          const columns = relationship.mapping.map(m => m.column?.column_name)
          return columns.every(column => column && this.canInsert(column))
        } else {
          // TODO array relationship
          return false
        }
      } else {
        // * Column
        const column = this.metadata.columns.find(
          col => col.column_name === fieldName
        )
        return !!column?.canInsert.length
      }
    } else {
      return !!this.metadata.canInsert_aggregate.aggregate?.count
    }
  },
  canUpdate(this: ContentsCollection, fieldName?: string): boolean {
    // ? Check the hasura permission rule ?
    if (fieldName) {
      const property = this.schema.jsonSchema.properties[fieldName]
      if (property?.ref) {
        // * Relationship
        const relationship = this.metadata.relationships.find(
          ({ rel_name }) => rel_name === fieldName
        )
        if (relationship?.rel_type === 'object') {
          // * object relationship
          const columns = relationship.mapping.map(m => m.column?.column_name)
          return columns.every(column => column && this.canUpdate(column))
        } else {
          // TODO array relationship
          return false
        }
      } else {
        // * Column
        const column = this.metadata.columns.find(
          col => col.column_name === fieldName
        )
        return !!column?.canUpdate.length
      }
    } else {
      return !!this.metadata.canUpdate_aggregate.aggregate?.count
    }
  },
  title(this: ContentsCollection, property?: string): string {
    return config(this, property)?.title || property || this.name
  },
  description(this: ContentsCollection, property?: string): string {
    return config(this, property)?.description || ''
  },
  icon(this: ContentsCollection, property?: string): string {
    return config(this, property)?.icon || ''
  },
  defaultView(this: ContentsCollection): string {
    return this.metadata.config?.default_view || 'table'
  }
}

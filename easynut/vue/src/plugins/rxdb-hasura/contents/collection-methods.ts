import { ContentsCollection, ContentsCollectionMethods } from '../types'

export const collectionMethods: ContentsCollectionMethods = {
  canInsert(this: ContentsCollection, fieldName?: string): boolean {
    // TODO make it work with relationships
    // ? Check the hasura permission rule ?
    return (
      (!!this.metadata.canInsert_aggregate.aggregate?.count && !fieldName) ||
      !!this.metadata.columns.find(col => col.column_name === fieldName)
        ?.canInsert.length
    )
  },
  canUpdate(this: ContentsCollection, fieldName?: string): boolean {
    // TODO make it work with relationships
    // ? Check the hasura permission rule ?
    return (
      (!!this.metadata.canUpdate_aggregate.aggregate?.count && !fieldName) ||
      !!this.metadata.columns.find(col => col.column_name === fieldName)
        ?.canUpdate.length
    )
  },
  title(this: ContentsCollection): string {
    return this.metadata.config?.title || this.name
  },
  description(this: ContentsCollection): string {
    return this.metadata.config?.description || ''
  },
  icon(this: ContentsCollection): string {
    return this.metadata.config?.icon || ''
  }
}

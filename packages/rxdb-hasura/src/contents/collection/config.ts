import { ContentsCollection, ContentsCollectionMethods } from '../../types'
const config = (collection: ContentsCollection, property?: string) =>
  property
    ? collection.metadata.columns.find(
        ({ column_name }) => column_name === property
      )?.config ||
      collection.metadata.relationships.find(rel => rel.rel_name === property)
        ?.config
    : collection.metadata.config
export const collectionConfigMethods: Pick<
  ContentsCollectionMethods,
  'title' | 'documentTitle' | 'description' | 'icon' | 'defaultView'
> = {
  title(this: ContentsCollection, property?: string): string {
    return config(this, property)?.title || property || this.name
  },
  documentTitle(this: ContentsCollection): string {
    return this.metadata.config?.document_title || this.name
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

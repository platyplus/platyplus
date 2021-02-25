import { ContentsCollection, ContentsCollectionMethods } from '../../types'
import { metadataName } from '../schema'
import { systemCollectionComponent } from '../system'
const config = (collection: ContentsCollection, property?: string) =>
  property
    ? collection.metadata.propertiesConfig.find(
        ({ property_name }) => property_name === property
      )
    : collection.metadata.config

export const collectionConfigMethods: Pick<
  ContentsCollectionMethods,
  'title' | 'documentTitle' | 'description' | 'icon' | 'componentName'
> = {
  title(this: ContentsCollection, property?: string): string {
    return (
      config(this, property)?.title || property || metadataName(this.metadata)
    )
  },
  documentTitle(this: ContentsCollection): string {
    return this.metadata.config?.document_title || this.title()
  },
  description(this: ContentsCollection, property?: string): string {
    return config(this, property)?.description || ''
  },
  icon(this: ContentsCollection, property?: string): string {
    return config(this, property)?.icon || ''
  },
  componentName(this: ContentsCollection): string {
    return (
      this.metadata.config?.component ||
      systemCollectionComponent(this) ||
      'table'
    )
  }
}

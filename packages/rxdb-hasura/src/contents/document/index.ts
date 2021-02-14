export * from './property-type'
import {
  ContentsCollection,
  ContentsDocument,
  ContentsDocumentMethods
} from '../../types'
import { systemDocumentComponent } from '../system'
import { propertyType } from './property-type'

export const documentMethods: ContentsDocumentMethods = {
  canEdit(this: ContentsDocument, propertyName?: string) {
    const collection = this.collection as ContentsCollection // TODO write an issue or a PR in rxdb repo
    return this._isTemporary
      ? collection.canInsert(propertyName)
      : collection.canUpdate(propertyName)
  },
  canSave: () => {
    // TODO validate data
    // * check hasura permissions
    // * check SQL constraints
    return true
  },
  canDelete(this: ContentsDocument) {
    return this.canEdit('deleted')
  },
  readComponent(this: ContentsDocument, propertyName: string) {
    const collection = this.collection as ContentsCollection
    const config = collection.metadata.propertiesConfig.find(
      config => config.property_name === propertyName
    )
    return config?.read_component || propertyType(this, propertyName)
  },
  readComponentOptions(this: ContentsDocument, propertyName: string) {
    const collection = this.collection as ContentsCollection
    const config = collection.metadata.propertiesConfig.find(
      config => config.property_name === propertyName
    )
    return config?.read_component_options
  },
  componentName(this: ContentsDocument) {
    return systemDocumentComponent(this) || 'card'
  },
  editComponent(this: ContentsDocument, propertyName: string) {
    const collection = this.collection as ContentsCollection
    const config = collection.metadata.propertiesConfig.find(
      config => config.property_name === propertyName
    )
    return config?.edit_component || propertyType(this, propertyName)
  },
  editComponentOptions(this: ContentsDocument, propertyName: string) {
    const collection = this.collection as ContentsCollection
    const config = collection.metadata.propertiesConfig.find(
      config => config.property_name === propertyName
    )
    return config?.edit_component_options
  }
}
